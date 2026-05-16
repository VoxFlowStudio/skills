# image-led-magazine

The image carries the card: photo, screenshot, product object, editorial illustration, generated visual, or intentional crop. Use this when visual evidence or atmosphere should lead.

## Must Use

- A dominant image or image-like visual field occupying at least 40% of the canvas.
- Intentional crop, bleed, edge placement, or image-led negative space.
- Caption, annotation, or short text that responds to the image.
- Subject-revealing imagery: the image must show the product, person, place, object, UI, or state.

## Must Not Use

- Blurred dark stock backgrounds.
- Purely atmospheric images that do not reveal the topic.
- Small framed image inside a text-first layout.
- Generated images containing their own page title, footer, watermark, or card chrome.
- Equal grids unless the language is explicitly `proof-grid`.

## Recommended Typography

- Headline: editorial serif or clean sans, sized to fit around image crop.
- Body: short sans.
- Captions: mono or compact sans.
- Avoid heavy body copy over complex image areas.

## Recommended Layout Recipes

- `cover-crop`
- `lead image + sidebar` via `split-diagram`
- `proof-grid` for evidence sets
- `cover-object` if the object/image is dominant
- `closer-question` for cinematic image closers

## Text Density Limit

- Low to medium.
- Text should not exceed 30% of the visual area.
- Keep overlays short.

## Asset Requirement

- Must use an image, screenshot, generated image, or image-like illustration.
- CSS-only abstract shape is not enough unless it clearly behaves like an image field and the topic is abstract.

## Best Modifiers

- `edge-crop`
- `annotation`
- `asymmetric-space`
- `layered-depth`

## QA

Pass only if the image is the first thing seen and the card would lose its meaning without it.

Fail if the image is a decorative background behind a normal text card.
