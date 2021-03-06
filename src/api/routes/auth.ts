import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { checkPermissions } from '../middleware/auth'
import { user } from '../middleware/params'

const router = Router()

router.param('user', user)

router.post('/login', checkPermissions, AuthController.login)
router.get('/me', checkPermissions, AuthController.me)

export default router
