import { User } from '../entities/User'

export const user = async (req, res, next, id) => {
  req.params.user = await User.findOne({ relations: ['roles'], where: { id } })
  next()
}
