---
layout: default
title: Home
---

<div class="home-intro">
  <h1>Recipe Collection</h1>
  <p>Recipes from around the world, organized by cuisine.</p>
</div>

<div class="search-bar">
  <input type="text" id="search-input" placeholder="Search recipes by title or tag…" autocomplete="off">
</div>

<div class="search-results" id="search-results" style="display:none">
  <strong>Results:</strong>
  <ul id="results-list"></ul>
</div>

## Browse by Cuisine

<div class="category-grid">
  <a href="{{ '/recipes/italian/' | relative_url }}" class="category-card">
    <h2>Italian</h2>
    <p>Pasta, risotto, and more.</p>
  </a>
  <a href="{{ '/recipes/french/' | relative_url }}" class="category-card">
    <h2>French</h2>
    <p>Classic French cuisine.</p>
  </a>
  <a href="{{ '/recipes/japanese/' | relative_url }}" class="category-card">
    <h2>Japanese</h2>
    <p>Sushi, ramen, and beyond.</p>
  </a>
  <a href="{{ '/recipes/chinese/' | relative_url }}" class="category-card">
    <h2>Chinese</h2>
    <p>Stir-fries, dim sum, and noodles.</p>
  </a>
  <a href="{{ '/recipes/mexican/' | relative_url }}" class="category-card">
    <h2>Mexican</h2>
    <p>Tacos, salsas, and mole.</p>
  </a>
  <a href="{{ '/recipes/indian/' | relative_url }}" class="category-card">
    <h2>Indian</h2>
    <p>Curries, breads, and spices.</p>
  </a>
  <a href="{{ '/recipes/thai/' | relative_url }}" class="category-card">
    <h2>Thai</h2>
    <p>Bold flavors and aromatic herbs.</p>
  </a>
  <a href="{{ '/recipes/middle-eastern/' | relative_url }}" class="category-card">
    <h2>Middle Eastern</h2>
    <p>Mezze, kebabs, and hummus.</p>
  </a>
  <a href="{{ '/recipes/greek/' | relative_url }}" class="category-card">
    <h2>Greek</h2>
    <p>Fresh Mediterranean flavors.</p>
  </a>
  <a href="{{ '/recipes/american/' | relative_url }}" class="category-card">
    <h2>American</h2>
    <p>Comfort food classics.</p>
  </a>
  <a href="{{ '/recipes/korean/' | relative_url }}" class="category-card">
    <h2>Korean</h2>
    <p>BBQ, kimchi, and bibimbap.</p>
  </a>
  <a href="{{ '/recipes/spanish/' | relative_url }}" class="category-card">
    <h2>Spanish</h2>
    <p>Tapas, paella, and churros.</p>
  </a>
</div>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script>
(function () {
  // Build the search index from Jekyll-generated data embedded below
  var recipes = [
    {% assign all_pages = site.pages | where_exp: "p", "p.layout == 'recipe'" %}
    {% for recipe in all_pages %}
    {
      "title": {{ recipe.title | jsonify }},
      "url": {{ recipe.url | relative_url | jsonify }},
      "tags": {{ recipe.tags | join: " " | jsonify }},
      "description": {{ recipe.description | default: "" | jsonify }},
      "cuisine": {{ recipe.cuisine | default: "" | jsonify }},
      "id": {{ forloop.index0 }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  if (recipes.length === 0) return;

  var idx = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('tags', { boost: 5 });
    this.field('cuisine', { boost: 3 });
    this.field('description');
    recipes.forEach(function (r) { this.add(r); }, this);
  });

  var input = document.getElementById('search-input');
  var resultsBox = document.getElementById('search-results');
  var resultsList = document.getElementById('results-list');

  input.addEventListener('input', function () {
    var query = input.value.trim();
    if (query.length < 2) {
      resultsBox.style.display = 'none';
      return;
    }
    var results;
    try { results = idx.search(query + '*'); } catch (e) { results = []; }
    resultsList.innerHTML = '';
    if (results.length === 0) {
      resultsList.innerHTML = '<li>No recipes found.</li>';
    } else {
      results.forEach(function (r) {
        var recipe = recipes[parseInt(r.ref)];
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = recipe.url;
        a.textContent = recipe.title;
        li.appendChild(a);
        if (recipe.description) {
          var desc = document.createTextNode(' — ' + recipe.description);
          li.appendChild(desc);
        }
        resultsList.appendChild(li);
      });
    }
    resultsBox.style.display = 'block';
  });
})();
</script>
