#!/usr/bin/env node
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const RATIOS = {
  '1:1': { width: 1080, height: 1080 },
  '3:4': { width: 1080, height: 1440 },
  '4:5': { width: 1080, height: 1350 },
  '9:16': { width: 1080, height: 1920 },
  '16:9': { width: 1920, height: 1080 },
};

function usage() {
  console.log(`Usage:
  node render-cards.mjs --input <html-dir> --output <png-dir> [--ratio 1:1|3:4|9:16] [--size 1080x1920] [--selector .card] [--scale 2]

Options:
  --input     Directory containing card-*.html files, or any .html files.
  --output    Directory for PNG exports and audit.json.
  --ratio     Aspect ratio. Defaults to 1:1. Supports known ratios or custom a:b.
  --size      Exact viewport size in WIDTHxHEIGHT. Overrides --ratio.
  --selector  Element to screenshot when present. Defaults to .card.
  --scale     deviceScaleFactor. Defaults to 2 for retina-quality exports.
  --wait      Milliseconds to wait after load. Defaults to 250.
`);
}

function parseArgs(argv) {
  const args = {
    ratio: '1:1',
    selector: '.card',
    scale: 2,
    wait: 250,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for ${token}`);
    }
    args[key] = value;
    i += 1;
  }

  return args;
}

function viewportFromArgs(args) {
  if (args.size) {
    const match = String(args.size).match(/^(\d+)x(\d+)$/i);
    if (!match) throw new Error('--size must be WIDTHxHEIGHT, for example 1080x1920');
    return { width: Number(match[1]), height: Number(match[2]) };
  }

  if (RATIOS[args.ratio]) return RATIOS[args.ratio];

  const match = String(args.ratio).match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  if (!match) throw new Error(`Unsupported ratio: ${args.ratio}`);

  const a = Number(match[1]);
  const b = Number(match[2]);
  if (a <= 0 || b <= 0) throw new Error(`Invalid ratio: ${args.ratio}`);

  const width = 1080;
  return { width, height: Math.round((width * b) / a) };
}

async function htmlFiles(inputDir) {
  const entries = await readdir(inputDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.html'))
    .map((entry) => path.join(inputDir, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function auditPage(page) {
  return page.evaluate(() => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    };

    const visibleElements = Array.from(document.querySelectorAll('body *')).filter((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    });

    const outOfBounds = [];
    const overflow = [];

    for (const element of visibleElements) {
      const rect = element.getBoundingClientRect();
      const label = element.id ? `#${element.id}` : element.className ? `.${String(element.className).trim().split(/\s+/).join('.')}` : element.tagName.toLowerCase();

      if (rect.left < -1 || rect.top < -1 || rect.right > window.innerWidth + 1 || rect.bottom > window.innerHeight + 1) {
        outOfBounds.push({
          element: label,
          rect: {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
          },
        });
      }

      if (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1) {
        overflow.push({
          element: label,
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          scrollHeight: element.scrollHeight,
          clientHeight: element.clientHeight,
        });
      }
    }

    return {
      viewport,
      hasHorizontalScroll: viewport.scrollWidth > viewport.width + 1,
      hasVerticalScroll: viewport.scrollHeight > viewport.height + 1,
      outOfBounds,
      overflow,
    };
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  if (!args.input || !args.output) {
    usage();
    throw new Error('--input and --output are required');
  }

  const viewport = viewportFromArgs(args);
  const inputDir = path.resolve(args.input);
  const outputDir = path.resolve(args.output);
  const files = await htmlFiles(inputDir);
  if (files.length === 0) throw new Error(`No .html files found in ${inputDir}`);

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    throw new Error('Playwright is not installed. Run: npm install -D playwright && npx playwright install chromium');
  }

  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const audit = [];

  try {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const page = await browser.newPage({
        viewport,
        deviceScaleFactor: Number(args.scale),
      });

      await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
      // Wait for locally embedded fonts to finish loading before screenshotting,
      // otherwise the capture can show fallback glyphs / font swap.
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
      await page.waitForTimeout(Number(args.wait));

      const handle = await page.$(args.selector);
      const baseName = path.basename(file, path.extname(file));
      const outputPath = path.join(outputDir, `${baseName}.png`);

      if (handle) {
        await handle.screenshot({ path: outputPath });
      } else {
        await page.screenshot({ path: outputPath, fullPage: false });
      }

      const pageAudit = await auditPage(page);
      audit.push({
        file,
        output: outputPath,
        selector: handle ? args.selector : null,
        viewport,
        ...pageAudit,
      });

      await page.close();
      console.log(`Rendered ${index + 1}/${files.length}: ${outputPath}`);
    }
  } finally {
    await browser.close();
  }

  const auditPath = path.join(outputDir, 'audit.json');
  await writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`);
  console.log(`Audit: ${auditPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
