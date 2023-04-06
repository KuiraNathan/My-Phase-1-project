const appId = 'dfaf2544';
const appKey = '47bf163680ba44196a1ff410abeda2f3';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
	const query = searchInput.value.trim();
	if (query === '') {
		return;
	}

	const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			const hits = data.hits;
			let html = '';
			hits.forEach(hit => {
				const recipe = hit.recipe;
				const title = recipe.label;
				const imageUrl = recipe.image;
				const recipeUrl = recipe.url;
				html += `
					<div class="search-result">
						<img src="${imageUrl}" alt="${title}">
						<div class="search-result-details">
							<h2><a href="${recipeUrl}" target="_blank">${title}</a></h2>
						</div>
					</div>
				`;
			});
			searchResults.innerHTML = html;
		})
		.catch(error => {
			console.error('Error:', error);
			searchResults.innerHTML = '<p>An error occurred while fetching search results.</p>';
		});
});