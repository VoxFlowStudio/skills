# product-catalog

Product/manual/catalog language: object presentation, callouts, specs, labels, and clean product framing. Use this when the topic can be treated as a product, tool, feature, module, UI object, or specimen.

## Must Use

- One central object/specimen/product/module as the focal point.
- At least one callout or spec label attached to the object.
- Clean object presentation with controlled whitespace.
- Labels explain visible object features or states.

## Must Not Use

- Generic device mockups with fake UI.
- SaaS dashboard cliches.
- Callouts floating without connecting to the object.
- Feature lists unrelated to visible parts.
- Excessive shadows/gloss.

## Recommended Typography

- Headline: clean bold sans.
- Specs/callouts: mono or compact sans.
- Body: short sans.
- Product label: mono.

## Recommended Layout Recipes

- `cover-object`
- `split-diagram`
- `artifact-board`
- `proof-grid` for feature states
- `before-after` for version comparisons

## Text Density Limit

- Low to medium.
- Max 3-5 callouts/specs.
- Body copy should be shorter than the labels/specs.

## Asset Requirement

- Must use an object. Can be a real product image, screenshot crop, generated object, or CSS-built product/specimen.
- If using screenshot, crop or redesign so the object is inspectable.

## Best Modifiers

- `annotation`
- `edge-crop`
- `cutaway`
- `stamp-label`

## QA

Pass only if the object remains the focal point and the callouts explain it.

Fail if the card is just a feature list with a decorative shape.
