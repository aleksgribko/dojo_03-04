class User {
    constructor(id, email, password, token) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.token = token
    }
}

class Res {
    constructor(ok, message, data) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}

module.exports = { User, Res };