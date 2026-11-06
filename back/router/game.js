import express from 'express'
import ControllerGame from '../controller/game.js'

const router = express.Router()

router.get('/status', ControllerGame.Status)
router.get('/ataque', ControllerGame.Ataque)
router.get('/defesa', ControllerGame.Defesa)
router.get('/curar', ControllerGame.Curar)
router.get('/resetar', ControllerGame.Resetar)

export default router