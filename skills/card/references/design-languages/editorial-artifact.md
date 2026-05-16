# editorial-artifact

Objects, labels, tickets, receipts, stamps, inspection sheets, dossiers, and physical-document metaphors. Use this when abstract information needs to feel tangible and inspectable.

## Must Use

- A dominant artifact: dossier, receipt, manifest, inspection sheet, ticket, tag, folder, package label, certificate, ledger, or form.
- At least one meaningful device: stamp, label, tab, tape, fold, serial number, approval mark, rejection mark, or punched hole.
- Layering or object depth: overlap, shadow, tilt, stacked paper, clipped edge, or folded corner.
- Text attached to the artifact or its labels, not only floating beside it.

## Must Not Use

- Equal grids of bordered cards as the main structure.
- Thin-line boxes pretending to be documents.
- Generic dashboard panels.
- Decorative stamps that do not encode status, action, or meaning.
- Full-canvas coordinate grids.

## Recommended Typography

- Headline: serif or expressive display, often large and editorial.
- Artifact text: mono or sturdy sans, like labels, manifests, or forms.
- Body copy: compact sans, secondary to the artifact.
- Metadata: mono, small, document-like.

## Recommended Layout Recipes

- `cover-object`
- `artifact-board`
- `checklist-sheet`
- `split-diagram`
- `before-after` when comparing two documents/states

## Text Density Limit

- Low to medium.
- Keep body copy under 45 Chinese characters per card when the artifact is large.
- Checklist/form rows can be denser, but should live inside one dominant artifact.

## Asset Requirement

- Must use an object. It can be CSS-built, image-based, or generated.
- External image is optional, but a physical/document metaphor is mandatory.

## Best Modifiers

- `layered-depth`
- `stamp-label`
- `receipt-form`
- `diagonal-tension`
- `paper-cut`

## QA

Pass only if the artifact is identifiable within one second and dominates the card more than the headline/body text.

Fail if removing the artifact leaves a normal text card.
