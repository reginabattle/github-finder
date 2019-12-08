class UI {
    constructor() {
        this.container = document.querySelector('.github-finder')
        this.results = document.querySelector('.github-finder-results')
    }

    // Show profile
    showProfile(user) {
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
    
        this.results.innerHTML = profile
    }

    // Show repos
    showRepos(repos) {
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

    // Show error message
    showError(message) {
        const header = document.querySelector('.github-finder h2')
        const div = document.createElement('div')

        div.classList.add('error')
        div.innerHTML = message
        this.container.insertBefore(div, header)

        setTimeout(() => {
            div.remove()
        }, 3000)
    }  
}

export { UI }