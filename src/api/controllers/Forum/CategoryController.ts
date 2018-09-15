import { Request, Response } from 'express'

import Controller from '../Controller'
import { ForumCategory } from '../../entities/ForumCategory'
import ForumPolicy from '../../policy/Forum'

class CategoryController extends Controller {
  list = async (req: Request, res: Response) => {
    let categories = await this.getTreeRepository(ForumCategory).findTrees()

    const policy = new ForumPolicy

    const filter = async categories => {
      const accessibleCategories = []

      for (let category of categories) {
        const canAccess = await policy.canUserAccessCategory(req.user, (category as any), false)

        if (!canAccess) {
          continue
        }

        if (category.children.length) {
          category.children = await filter(category.children)
        }

        accessibleCategories.push(category)
      }

      return accessibleCategories
    }

    categories = await filter(categories)

    return res.status(200).send(categories)
  }

  get = async (req: Request, res: Response) => {
    if (req.params.forumCategory) {
      const category = req.params.forumCategory
      const categoryWithChildren = await this.getTreeRepository(ForumCategory).findDescendantsTree(category)
      return res.send(categoryWithChildren)
    }

    return res.status(404).send({ message: 'Category not found.' })
  }

  create = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      name: 'required',
      acceptsThreads: 'required|boolean'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    let parent = null
    if (req.body.parent) {
      parent = await ForumCategory.findOne({ id: req.body.parent })
    }

    let category = await ForumCategory.create({
      name: req.body.name,
      acceptsThreads: req.body.acceptsThreads,
      parent
    })

    category = await category.save()

    return res.status(201).send(category)
  }

  update = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      acceptsThreads: 'boolean'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    let category = req.params.forumCategory

    if (req.body.name) {
      category.name = req.body.name
    }

    if (req.body.acceptsThreads !== null) {
      category.acceptsThreads = req.body.acceptsThreads
    }

    if (req.body.parent) {
      const parent = await ForumCategory.findOne({ id: req.body.parent })

      if (!parent) {
        return res.status(422).send({ errors: { parent: ['Invalid parent category specified.'] } })
      }

      category.parent = parent
    }

    category = await category.save()

    return res.status(200).send(category)
  }
}

export default new CategoryController
