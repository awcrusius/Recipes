# Recipe Site — Claude Context

## What this repo is
A Jekyll site for GitHub Pages. Recipes are Markdown files organized by category
under `recipes/`. The site auto-publishes via GitHub Pages.

## Adding a new recipe
1. Create a `.md` file in the appropriate `recipes/<category>/` subfolder.
2. Use kebab-case filenames (e.g. `lemon-roast-chicken.md`).
3. Use this frontmatter:

   ```yaml
   ---
   layout: recipe
   title: "Recipe Name"
   cuisine: <cuisine>
   meal_type: <breakfast|lunch|dinner|snack|dessert|drink|condiment>
   servings: 4
   prep_time: 15
   cook_time: 30
   total_time: 45
   yield: "250 mL"      # optional; see "Yield / makes" below
   tags: [tag1, tag2]
   allergens: [wheat, soy]  # optional; renders as icon pills below the tags
   photo: "filename.jpg"    # optional; stored in assets/images/recipes/<cuisine>/
   description: "Brief description."
   ---
   ```

   The `yield` field is optional (`makes` works as an alias). When present it
   must start with a number so it can scale/convert — e.g. `"250 mL"`,
   `"12 cookies"`, `"1.5 L"`. See "Yield / makes" below.

4. Write `## Ingredients` and `## Instructions` sections below the frontmatter.
5. Each ingredient line must start with its quantity, then (optionally) a unit,
   then the ingredient name — e.g. `- 90 g white sugar`, `- 2 cups flour`,
   `- 2 garlic cloves, minced`. The scaler/converter parses this.
6. Under each numbered instruction step, add a **nested bullet list** of the
   ingredients used in that step, in the same `qty unit name` format. These render
   as an ingredient callout box and **auto-scale / unit-convert** with the controls
   (the layout parses them too). Example:

   ```markdown
   1. **Dissolve the sugar** — Combine the sugar and water…
      - 90 g white sugar
      - 140 mL water
   ```

   - Indent the sub-bullets 3 spaces (to align under `N. `).
   - List each ingredient once, at the step where it is first used; omit the
     sub-list for steps that introduce no new ingredient (e.g. "Cool", "Bottle").
   - **Part of the whole:** if a step uses only a portion, give the partial amount
     plus a *relative* note — `- 30 g cilantro (½ of total)` or `- 1 clove (half)`.
     Never use an absolute denominator like `1 of 2`; the `2` would not scale.

## Ingredient scaling & units (applies to ALL recipes)
The recipe layout (`_layouts/recipe.html`) renders two controls on every recipe:

- **Scale** — preset multipliers `×0.5`, `×1`, `×2`, plus **Custom** (any factor).
  All ingredient quantities update live.
- **Units** — a **Metric / Imperial** toggle that converts each ingredient's
  quantity to the chosen system. The default follows whichever system most of the
  recipe's units are authored in.

Author ingredients so this works:
- Put a numeric quantity first (integers, decimals like `1.5`, or fractions like
  `1/2` / `½`).
- Use a recognized unit token right after the number for conversion to kick in:
  - **Mass:** `mg`, `g`, `kg`, `oz`, `lb`
  - **Volume:** `mL`, `L`, `tsp`, `tbsp`, `cup`, `fl oz`
- Count-based items (no unit — e.g. `2 garlic cloves`, `2 chillies`) are scaled
  but never unit-converted.

## Yield / makes (applies to ALL recipes)
If a recipe declares a `yield` (or `makes`) frontmatter field, the layout shows a
**Makes** line that **scales and unit-converts** with the controls, exactly like an
ingredient. Author it as a quantity-first string so it parses:
- `yield: "250 mL"` → shows `Makes 250 mL`, becomes `Makes 500 mL` at ×2, and
  `Makes 1.06 cup` under Imperial.
- `yield: "12 cookies"` → count-based; scales to `24 cookies` at ×2 (never converted).
Recipes without the field simply omit the Makes line. Do **not** also hard-code a
static "Yield:" line in the body — the dynamic field replaces it.

## Allergens
Add an `allergens` list to frontmatter to display allergen pills (with emoji icons) below
the tags on the recipe page. Icons are defined in `_data/allergens.yml`. Common values:
`wheat`, `gluten`, `soy`, `dairy`, `milk`, `eggs`, `nuts`, `tree-nuts`, `peanuts`, `fish`,
`shellfish`, `sesame`, `mustard`. Do **not** put allergens in the Notes section body — use
this frontmatter field instead.

## Recipe photos
Add `photo: "filename.jpg"` to frontmatter to display a hero photo at the top of the recipe.
Store the image at `assets/images/recipes/<cuisine>/filename.jpg`. The path is derived
automatically from `page.cuisine`. Supported formats: jpg, jpeg, png, webp.

## Cuisines (folder names)
- italian
- french
- japanese
- chinese
- mexican
- indian
- thai
- middle-eastern
- greek
- american
- korean
- spanish
- vietnamese

## Serving scaler & unit converter
Implemented in `_layouts/recipe.html` with vanilla JS. It parses each ingredient
`<li>` into quantity + unit + name, scales by the selected preset/custom factor,
and converts mass/volume units between metric and imperial. See "Ingredient
scaling & units" above for the authoring rules.

## Building locally
`bundle exec jekyll serve`

## GitHub Pages
Push to `main`. Pages is configured to deploy from root on `main`.
Go to Settings → Pages → Source: Deploy from branch → main → / (root).
