import { Router } from 'express'
import NWNController from '../controllers/NWNController'

const router = Router()

router.get('/server-status', NWNController.serverStatus)

export default router
