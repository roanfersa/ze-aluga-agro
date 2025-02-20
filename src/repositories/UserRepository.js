import User from '../models/User';

export default class UserRepository {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        return fetch('/users.json')
            .then(response => response.json())
            .then(data => data.map(user => new User(
                user.id,
                user.name,
                user.email,
                user.phone,
                user.is_seller,
                user.store_name,
                user.product_count,
                user.followers_count
            )));
    }

    getUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.then(users => users.find(user => user.id === id));
    }
}