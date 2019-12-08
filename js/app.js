import 'babel-polyfill';
import { GithubFinder } from './library'
import { UI } from './ui'

const github = new GithubFinder
const ui = new UI

const form = document.querySelector('.github-finder-search')
let username = document.querySelector('#username')

// Event listener
form.addEventListener('submit', (e) => {
	e.preventDefault()

	if(username.value !== '') {
		// Get user info
		github.getUser(username.value)
		.then(user => {
			if(user) {
				ui.showProfile(user.profile)

				if(user.repos.length > 0) {
					ui.showRepos(user.repos)
				}

			} else {
				ui.showError("User doesn't exist")
			}
		})
	} else {
		ui.showError("Enter a username")
	}

	// Clear field
	username.value = ''
})