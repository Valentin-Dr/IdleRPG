const db = require('../database');
const bcrypt = require('bcrypt');

class User {

    constructor(obj={}) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }

    async save() {
        try {

            const password = await bcrypt.hash(this.password, 10)
            const {rows} = await db.query('INSERT INTO "user"(email, password, name) VALUES($1, $2, $3) RETURNING id', [this.email, password, this.name]);
            this.id = rows[0].id;
            return this;

        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            }
            throw error
        }
    }

    async doLogin() {
        try {

            const {rows} = await db.query('SELECT * FROM "user" WHERE email=$1', [this.email]);
            if (!rows[0]) {
                throw new Error('Identification failed');
            }
            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);
            if (!isPwdValid) {
                throw new Error('Identification failed');
            }
            this.id = rows[0].id;
            this.name = rows[0].name; 
            return this;

        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            }
            throw error
        }
    }
}

module.exports = User;