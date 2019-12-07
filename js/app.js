import 'babel-polyfill';
import { GithubFinder } from './library';

const github = new GithubFinder

const container = document.querySelector('.github-finder')
const form = document.querySelector('.github-finder-search')
let content = document.querySelector('.github-finder-results')
let username = document.querySelector('#username')

const showProfile = (user) => {
	let userInfo = 
		`<div class="user-card">
			<div class="user-header">
				<img class="user-avatar" src="${user.avatar_url}" alt="${user.name}">
				<h3 class="user-name">${user.name} 
					<span><a href="${user.html_url}">${user.login}</a>
				</h3>
				<p class="user-status ${user.hireable ? '' : 'disabled' }">${user.hireable ? 'For hire' : 'Busy' }</p>
			</div>
			${user.bio ? `<div class="user-bio"><p>${user.bio}</p></div>` :' '}
			<button class="bookmark-button"><i class="material-icons">bookmark_border</i></button>
		</div>`

	content.innerHTML += userInfo
}

const showError = (message) => {
	const header = document.querySelector('.github-finder h2')
	const div = document.createElement('div')

	div.classList.add('error')
	div.innerHTML = message
	container.insertBefore(div, header)

	setTimeout(() => {
		div.remove()
	}, 3000)
}

// Event listener
form.addEventListener('submit', (e) => {
	e.preventDefault()

	if(username.value !== '') {
		// Get user info
		github.getUser(username.value)
		.then(user => {
			if(user) {
				showProfile(user.profile)

			} else {
				showError("User doesn't exist")
			}
		})
	} else {
		showError("Enter a username")
	}

	// Clear field
	username.value = ''
})