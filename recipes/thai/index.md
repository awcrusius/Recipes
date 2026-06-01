---
layout: default
title: Thai Recipes
---

<a href="{{ '/' | relative_url }}" class="back-link">&larr; All categories</a>

# Thai Recipes

<ul class="recipe-list">
  {% assign thai_recipes = site.pages | where: "cuisine", "thai" | sort: "title" %}
  {% for recipe in thai_recipes %}
  <li>
    <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
    {% if recipe.total_time %}<span class="meta-inline">{{ recipe.total_time }} min</span>{% endif %}
    {% if recipe.description %}<span class="desc-inline">{{ recipe.description }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
