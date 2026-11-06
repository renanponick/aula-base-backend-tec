import express from 'express'
import ControllerPartida from '../controller/partida.js'

const router = express.Router()

router.get('/', ControllerPartida.BuscarTodas)
router.get('/:id', ControllerPartida.BuscarPorId)
router.post('/', ControllerPartida.Criar)
router.put('/:id', ControllerPartida.Atualizar)
router.delete('/:id', ControllerPartida.Deletar)

export default router