/*
MVP = Minimum Viable Product
Vår MVP ska innehålla:
1. hämta snippets (recent)
2. byta vy till "upload"
3. lägg till ny snippet
*/

const btnLatest = document.querySelector('#btn-latest')

const baseUrl = 'https://www.forverkliga.se/JavaScript/api/api-snippets.php'

btnLatest.addEventListener('click', async () => {
	btnLatest.disabled = true
	// TODO: gör så att vi kan byta mellan flikar

	const url = baseUrl + '?latest'

	try {
		const response = await fetch(url)
		const data = await response.json()

		// Hur ser datan i serverns svar ut?
		console.log('Data from server: ', data)
		renderSnippets(data)

	} catch(error) {
		// TODO: informera användaren
	} finally {
		btnLatest.disabled = false
	}
})

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
/*
example data from server:
{
	content: "NodeTestContent_1760266184036"
	id: 1568
	is_reported: 0
	score: 0
	tags: ""
	title: "NodeTestTitle_1760266184036"
	upload_dt: "2025-10-12 10:49:47"
}

example HTML:
<div class="vote">
	<h2> title </h2>
	<code>let x=5;</code>
	<div class="vote-buttons">
		<button class="vote">🗑️</button>
		<button class="vote">✍️</button>
		<button class="vote">👍</button>
		<button class="vote">👎</button>
		<span class="score">5</span>
	</div>
	<p> Submitted: date+time </p>
</div>
*/