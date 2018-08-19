import { User } from '../entities/User'
import { Role } from '../entities/Role'

export const user = (req, res, next, id) => {
  req.resourceQuery = User.findOne({ relations: ['roles'], where: { id } })
  next()
}
