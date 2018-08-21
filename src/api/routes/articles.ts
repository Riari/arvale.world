import { Router } from 'express'
import ArticleController from '../controllers/ArticleController'
import { checkPermissions } from '../middleware/auth'
import { article, articleCategory } from '../middleware/params'

const router = Router()

router.param('article', article)
router.param('articleCategory', articleCategory)

router.get('/', ArticleController.list)
router.get('/category/:articleCategory', ArticleController.list)
router.get('/:article', ArticleController.get)
router.post('/', checkPermissions, ArticleController.create)
router.patch('/:article', checkPermissions, ArticleController.update)
router.delete('/:article', checkPermissions, ArticleController.remove)

export default router
