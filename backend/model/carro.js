import database from "../config/database.js";
import usuario from "./usuario.js";

class Carro {
    constructor() {
        this.model = database.db.define("carros", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            marca: {
                type: database.db.Sequelize.STRING,
            },
            ano: {
                type: database.db.Sequelize.INTEGER,
            },
            usuarioId: {
                field: 'usuario_id',
                type: database.db.Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: usuario,
                    key: 'id'
                }
            }
        })
    }
}

export default new Carro().model