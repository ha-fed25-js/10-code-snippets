/*
MVP = Minimum Viable Product
Vår MVP ska innehålla:
1. hämta snippets (recent)
2. byta vy till "upload"
3. lägg till ny snippet
*/

import { renderSnippets } from "./render.js"


const btnShowLatest = document.querySelector('#btn-show-latest')
const btnShowUpload = document.querySelector('#btn-show-upload')
const btnPostSnippet = document.querySelector('#btn-post-snippet')
const views = document.querySelectorAll('.view')  // representerar olika vyer
const inputTitle = document.querySelector('#i1')
const inputContent = document.querySelector('#i2')

const baseUrl = 'https://www.forverkliga.se/JavaScript/api/api-snippets.php'

btnShowLatest.addEventListener('click', async () => {
	btnShowLatest.disabled = true

	hideComponents()
	const snippetView = document.querySelector('.snippet-view')
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
})


btnShowUpload.addEventListener('click', () => {
	// console.log('Du klickade på "upload new"')
	hideComponents()

	const uploadView = document.querySelector('.upload')
	uploadView.classList.remove('hidden')

})

function hideComponents() {
	// Dölj alla vyer
	views.forEach(com => com.classList.add('hidden'))
	// console.log('hideComponent ', views.length)
}

btnPostSnippet.addEventListener('click', async () => {
	// hindra att användaren klickar flera gånger på knappen
	// samla in datan från formuläret
	// paketera datan i ett objekt
	// LÄS DOKUMENTATIONEN!!!!
	// förbered fetch: omvandla datan med JSON.stringify, skapa ett inställningsobjekt
	// anropa fetch och await (vänta på resultatet)
	// kontrollera svaret från servern - gick det bra?
	// om ja: byt till vyn "Latest" (bonusuppgift)
	// om nej: visa meddelande för användaren

	btnPostSnippet.disabled = true
	let postData = {
		add: '',
		title: inputTitle.value,
		content: inputContent.value
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postData)
	}
	const url = baseUrl + '?add'
	try {
		const response = await fetch(url, options)
		const statusObject = await response.json()
		// console.log('POST done, status: ', statusObject)
		if( statusObject.status === 'success' ) {
			// TODO: visa ett meddelande på sidan, eller
			// TODO: bonusuppgift: visa "Latest" vyn (och hämta från API:et igen)
		} else {
			// TODO: visa ett meddelande på sidan, "Försök igen senare"
		}


	} catch(error) {
		console.log('POST snippet, något gick fel: ', error.message)

	} finally {
		btnPostSnippet.disabled = false
	}
})
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