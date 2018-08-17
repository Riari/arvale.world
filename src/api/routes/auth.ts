import AuthController from '../controllers/AuthController'
import { Router } from 'express'

const router = Router()

router.post('/user', AuthController.createUser)
router.post('/login', AuthController.login)
router.get('/me', AuthController.me)

export default router
