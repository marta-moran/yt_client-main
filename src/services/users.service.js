import InitAxios from "./init.service"

class UserService extends InitAxios {
    constructor() {
        super('users')
    }

    getUsers() {
        return this.api.get('/list').then(({ data }) => data)
    }

    getLoggedUser(token) {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return this.api.get('/getLoggedUser', { headers }).then(({ data }) => data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService()
        }

        return this.instance
    }
}

export default UserService.getInstance()