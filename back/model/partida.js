import database from '../config/database.js'

const Partida = database.db.define('Partida', {
    id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Id',
    },
    descricao: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        field: 'Descricao',
    },
    data: {
        type: database.db.Sequelize.DATE,
        allowNull: false,
        field: 'Data',
    },
    vencedor: {
        type: database.db.Sequelize.STRING,
        allowNull: true,
        field: 'Vencedor',
    },
}, {
    tableName: 'Partidas',
    timestamps: false,
})

export default Partida