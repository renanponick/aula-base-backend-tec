import { Carro } from '../model/index.js';

// INSERT INTO carros (marca, ano) VALUES ("FIAT", 1998)
class RepositoryCarro {
    
    async Find() {
        const carros = await Carro.findAll()

        return carros
    }

    async FindById(id) {
        const carroDetalhes = await Carro.findByPk(id)

        return carroDetalhes
    }

    async Create(marca, ano) {
        const carroCreate = await Carro.create({ marca, ano })

        return carroCreate
    }

    async Update(id, marca, ano) {
        const carroAlterar = await Carro.findByPk(id)

        if(!carroAlterar) {
            throw new Error("Carro não encontrado")
        }

        carroAlterar.marca = marca || carroAlterar.marca
        carroAlterar.ano = ano || carroAlterar.ano

        await carroAlterar.save()
    }

    async Delete(id) {
        const carroDeletar = await Carro.findByPk(id)

        if(!carroDeletar){
            throw new Error("Carro não encontrado")
        }

        await carroDeletar.destroy()

        return carroDeletar
    }
}

export default new RepositoryCarro()