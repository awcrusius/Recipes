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
   meal_type: <breakfast|lunch|dinner|snack|dessert|drink>
   servings: 4
   prep_time: 15
   cook_time: 30
   total_time: 45
   tags: [tag1, tag2]
   description: "Brief description."
   ---
   ```

4. Write `## Ingredients` and `## Instructions` sections below the frontmatter.
5. Each ingredient line should start with its quantity (e.g. `- 2 cups flour`).
   The serving scaler parses this.

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

## Serving scaler
Implemented in `_layouts/recipe.html` with vanilla JS. It parses leading
numbers/fractions from ingredient `<li>` elements and scales them on input change.

## Building locally
`bundle exec jekyll serve`

## GitHub Pages
Push to `main`. Pages is configured to deploy from root on `main`.
Go to Settings → Pages → Source: Deploy from branch → main → / (root).
