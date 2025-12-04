// Alla funktioner som gör fetch

import { hideComponents, renderSnippets } from "./render.js"

const baseUrl = 'https://www.forverkliga.se/JavaScript/api/api-snippets.php'


async function doUpvote(snippet, container) {
	const upvoteBtn = container.querySelector('.upvote')
	// hindra dubbelklick
	// LÄS DOKUMENTATIONEN!!!
	// skicka ett request
	// hantera svaret
	upvoteBtn.disabled = true

	const url = baseUrl + '?upvote'
	const postData = { upvote: '', id: snippet.id }
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postData)
	}
	try {
		const response = await fetch(url, options)
		const statusObject = await response.json()
		console.log('upvote response', snippet.id, statusObject)

		// Om uppdateringen lyckas, uppdatera gränssnittet (UI)
		container.querySelector('.score').textContent = snippet.score + 1

	} catch(error) {
		console.log('Ett fel inträffade vid upvote: ', error.message)
	} finally {
		upvoteBtn.disabled = false
	}
}

async function doFetchLatest(btnShowLatest, snippetView) {
	btnShowLatest.disabled = true

	hideComponents()
	snippetView.classList.remove('hidden')

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
		btnShowLatest.disabled = false
	}
}



export { doUpvote, doFetchLatest }
