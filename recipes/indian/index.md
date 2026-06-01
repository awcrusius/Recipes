---
layout: default
title: Indian Recipes
---

<a href="{{ '/' | relative_url }}" class="back-link">&larr; All categories</a>

# Indian Recipes

<ul class="recipe-list">
  {% assign indian_recipes = site.pages | where: "cuisine", "indian" | sort: "title" %}
  {% for recipe in indian_recipes %}
  <li>
    <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
    {% if recipe.total_time %}<span class="meta-inline">{{ recipe.total_time }} min</span>{% endif %}
    {% if recipe.description %}<span class="desc-inline">{{ recipe.description }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
