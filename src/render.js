// Funktioner som renderar
// dvs skapar DOM-element och fyller dem med content
// baserat på data.

function renderSnippets(snippets) {
	const snippetsContainer = document.querySelector('.snippets')
	const template = `
	<h2> </h2>
	<code> </code>
	<div class="vote-buttons">
		<button class="vote">🗑️</button>
		<button class="vote">✍️</button>
		<button class="vote">👍</button>
		<button class="vote">👎</button>
		<span class="score"> </span>
	</div>
	<p> Submitted: ? </p>
	`
	snippetsContainer.innerHTML = ''

	snippets.forEach(snippet => {
		const container = document.createElement('div')
		container.classList.add('snippet')
		container.innerHTML = template
		// Använd innerHTML på elementen INNAN vi lägger in datan från användaren

		container.querySelector('h2').textContent = snippet.title
		container.querySelector('code').textContent = snippet.content
		container.querySelector('p').textContent = `Submitted: ${snippet.upload_dt}`
		container.querySelector('.score').textContent = snippet.score

		snippetsContainer.append(container)
	})
}

export { renderSnippets }
