import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { checkPermissions } from '../middleware/auth'
import { user } from '../middleware/params'

const router = Router()

router.param('user', user)

router.post('/user', checkPermissions, AuthController.createUser)
router.post('/user/verify', checkPermissions, AuthController.verifyUser)
router.post('/login', checkPermissions, AuthController.login)
router.get('/me', checkPermissions, AuthController.me)

router.get('/test/:user', checkPermissions, (req, res) => {
  res.send('blep')
})

export default router
