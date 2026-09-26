import express from "express"
import ControllerUsuario from "../controller/usuario.js"
import authMiddleware from "../middleware/auth.js"
const router = express.Router()

// TODO
router.post("/login", ControllerUsuario.Login)
router.get("/buscar", authMiddleware, ControllerUsuario.Buscar)
router.get("/detalhe", authMiddleware, ControllerUsuario.Detalhe)
router.post("/criar", ControllerUsuario.Criar)
router.put("/alterar", authMiddleware, ControllerUsuario.Alterar)
router.delete("/deletar", authMiddleware, ControllerUsuario.Deletar)

export default router