import { ForumCategory } from '../../entities/ForumCategory'

export default class CategoryService {
  get = (id: number) => {
    return ForumCategory.findOne({ id })
  }
}
