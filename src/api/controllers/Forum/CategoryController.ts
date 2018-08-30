import { Request, Response } from 'express'

import Controller from '../Controller'
import { ForumCategory } from '../../entities/ForumCategory'

class CategoryController extends Controller {
  list = async (req: Request, res: Response) => {
    const categories = await this.getTreeRepository(ForumCategory).findTrees()
    return res.status(200).send(categories)
  }

  get = async (req: Request, res: Response) => {
    if (req.params.forumCategory) {
      return res.send(req.params.forumCategory)
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
}

export default new CategoryController
