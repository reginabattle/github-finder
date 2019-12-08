import 'babel-polyfill';
import { GithubFinder } from './library';

const github = new GithubFinder

const container = document.querySelector('.github-finder')
const form = document.querySelector('.github-finder-search')
let content = document.querySelector('.github-finder-results')
let username = document.querySelector('#username')

const showProfile = user => {
	let profile = 
	`<div class="user-card">
		<div class="user-header">
			<div class="user-info">
				<img class="user-avatar" src="${user.avatar_url}" alt="${user.name}">
				<h2 class="user-name">${user.name} 
					<span><a href="${user.html_url}">${user.login}</a>
				</h2>
				${ user.bio ? `<div class="user-bio"><p>${user.bio}</p></div>` : '' }
			</div>
			<p class="user-status ${ user.hireable ? '' : 'disabled' }">${ user.hireable ? 'For hire' : 'Busy' }</p>
		</div>
		
		<div class="repos">
			<h3>Repos</h3>
			<ul class="repo-list"></ul>
		</div>
	</div>`

	content.innerHTML = profile
}

const showRepos = repos => {
	let list = document.querySelector('.repo-list')
	repos.forEach(repo => {
		const li = document.createElement('li')
		li.innerHTML = 
		`
			<h4><a href="${repo.html_url}">${repo.name}</a></h4>
			<span class="lang">${repo.language}</span>
			<span class="date">${new Date(repo.updated_at)}</span>
		`
		list.appendChild(li)
	})
}

const showError = message => {
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

				if(user.repos.length > 0) {
					showRepos(user.repos)
				}

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