class GithubFinder {
    // GET
    async getUser(url) {
        const response = await fetch(url)
        const data = await response.json()

        if(response.status === 200) {
            return data
        } 
    }
}

export { GithubFinder }

