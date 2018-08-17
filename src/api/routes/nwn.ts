import NWNController from '../controllers/NWNController'
import { Router } from 'express'

const router = Router()

router.get('/server-status', NWNController.serverStatus)

export default router
