const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000'
    }

    async getUsers() {
        const users = await this.get('/users')
        const roles = await this.get('/roles')
        return users.map((user) => {
            user.role = roles.find((role) => role.id === user.role)
            return user
        })
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`)
        user.role = await this.get(`/roles/${user.role}`)
        return user;
    }
}

module.exports = UsersAPI