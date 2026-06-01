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
   tags: [tag1, tag2]
   description: "Brief description."
   ---
   ```

4. Write `## Ingredients` and `## Instructions` sections below the frontmatter.
5. Each ingredient line must start with its quantity, then (optionally) a unit,
   then the ingredient name — e.g. `- 90 g white sugar`, `- 2 cups flour`,
   `- 2 garlic cloves, minced`. The scaler/converter parses this.

## Ingredient scaling & units (applies to ALL recipes)
The recipe layout (`_layouts/recipe.html`) renders two controls on every recipe:

- **Scale** — preset multipliers `×0.5`, `×1`, `×2`, `×3`, plus **Custom** (any
  factor). All ingredient quantities update live.
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
