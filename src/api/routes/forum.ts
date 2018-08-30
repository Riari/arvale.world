import { Router } from 'express'
import CategoryController from '../controllers/Forum/CategoryController'
import ThreadController from '../controllers/Forum/ThreadController'
import PostController from '../controllers/Forum/PostController'
import { checkPermissions } from '../middleware/auth'
import { forumCategory, forumThread, forumPost } from '../middleware/params'

const router = Router()

router.param('category', forumCategory)
router.param('thread', forumThread)
router.param('post', forumPost)

router.get('/category', checkPermissions, CategoryController.list)
router.get('/category/:category', checkPermissions, CategoryController.get)
router.post('/category', checkPermissions, CategoryController.create)

router.get('/category/:category/thread', checkPermissions, ThreadController.listByCategory)
router.post('/thread', checkPermissions, ThreadController.create)
router.patch('/thread/:thread', checkPermissions, ThreadController.update)
router.delete('/thread/:thread', checkPermissions, ThreadController.remove)

router.post('/post', checkPermissions, PostController.create)
router.patch('/post/:post', checkPermissions, PostController.update)
router.delete('/post/:post', checkPermissions, PostController.remove)

export default router
