import { Sequelize } from "sequelize";

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            dialect: 'mysql',
            database: 'JogoTurnoAPI',
            host: 'localhost',
            username: 'root',
            password: '',
        })
    }
}

export default new Database()