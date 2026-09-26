import { Sequelize } from "sequelize";

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            dialect: "mysql",
            host: "localhost",
            database: "exemplo",
            username: "root",
            password: ""
        })
    }
}

export default new Database()