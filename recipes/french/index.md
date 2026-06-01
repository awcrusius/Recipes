---
layout: default
title: French Recipes
---

<a href="{{ '/' | relative_url }}" class="back-link">&larr; All categories</a>

# French Recipes

<ul class="recipe-list">
  {% assign french_recipes = site.pages | where: "cuisine", "french" | sort: "title" %}
  {% for recipe in french_recipes %}
  <li>
    <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
    {% if recipe.total_time %}<span class="meta-inline">{{ recipe.total_time }} min</span>{% endif %}
    {% if recipe.description %}<span class="desc-inline">{{ recipe.description }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
