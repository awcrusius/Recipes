---
layout: default
title: Chinese Recipes
---

<a href="{{ '/' | relative_url }}" class="back-link">&larr; All categories</a>

# Chinese Recipes

<ul class="recipe-list">
  {% assign chinese_recipes = site.pages | where: "cuisine", "chinese" | sort: "title" %}
  {% for recipe in chinese_recipes %}
  <li>
    <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
    {% if recipe.total_time %}<span class="meta-inline">{{ recipe.total_time }} min</span>{% endif %}
    {% if recipe.description %}<span class="desc-inline">{{ recipe.description }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
