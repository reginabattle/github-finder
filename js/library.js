class GithubFinder {
    // Get user
    async getUser(user) {
        const profileData = await fetch(`https://api.github.com/users/${user}`)
        const profile = await profileData.json()

        const repoData = await fetch(`https://api.github.com/users/${user}`)
        const repos = await repoData.json()

        if(profileData.status === 200) {
            return {profile, repos}
        }
    }
}
export { GithubFinder }