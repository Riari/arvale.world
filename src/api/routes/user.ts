import { Router } from 'express'
import UserController from '../controllers/UserController'
import { checkPermissions } from '../middleware/auth'
import { user } from '../middleware/params'

const router = Router()

router.param('user', user)

router.post('/', checkPermissions, UserController.create)
router.post('/verify', checkPermissions, UserController.verify)

export default router
