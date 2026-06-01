---
layout: default
title: Middle Eastern Recipes
---

<a href="{{ '/' | relative_url }}" class="back-link">&larr; All categories</a>

# Middle Eastern Recipes

<ul class="recipe-list">
  {% assign me_recipes = site.pages | where: "cuisine", "middle-eastern" | sort: "title" %}
  {% for recipe in me_recipes %}
  <li>
    <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
    {% if recipe.total_time %}<span class="meta-inline">{{ recipe.total_time }} min</span>{% endif %}
    {% if recipe.description %}<span class="desc-inline">{{ recipe.description }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
