import Usuario from "./usuario.js";
import Carro from "./carro.js";

Usuario.hasMany(Carro, {
    foreignKey: "usuarioId",
    as: "carros"
});

Carro.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario"
});

export {
    Usuario,
    Carro
};