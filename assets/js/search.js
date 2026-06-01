// Recipe search powered by lunr.js.
// Recipe data is injected as `window.RECIPE_INDEX` by the home page.
(function () {
  var recipes = window.RECIPE_INDEX || [];
  if (recipes.length === 0) return;
  if (typeof lunr === 'undefined') return;

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
  if (!input || !resultsBox || !resultsList) return;

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
      var none = document.createElement('li');
      none.textContent = 'No recipes found.';
      resultsList.appendChild(none);
    } else {
      results.forEach(function (r) {
        var recipe = recipes[parseInt(r.ref, 10)];
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = recipe.url;
        a.textContent = recipe.title;
        li.appendChild(a);
        if (recipe.description) {
          li.appendChild(document.createTextNode(' — ' + recipe.description));
        }
        resultsList.appendChild(li);
      });
    }

    resultsBox.style.display = 'block';
  });
})();
