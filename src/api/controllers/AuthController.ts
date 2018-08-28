import { Request, Response } from 'express'
import Controller from './Controller'
import { User } from '../entities/User'
import { verifyPassword, signJWT } from '../utils/auth'

class AuthController extends Controller {
  login = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      email: 'required|email',
      password: 'required|min:6|max:64'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const user = await User.findOne({
      select: ['id', 'name', 'email', 'verified', 'password'],
      relations: ['roles'],
      where: { email: req.body.email }
    })

    if (!user) {
      return res.status(404).send({ message: 'No user found matching the given details.' })
    }

    if (!user.verified) {
      return res.status(401).send({ message: 'Account not verified. Check your inbox for a verification email.' })
    }

    const passwordIsValid = verifyPassword(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password.' })
    }

    const token = signJWT({ id: user.id })

    res.send({ user: user.transform(), token })
  }

  me = (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ message: 'No valid token provided.' })
    }

    return res.send(req.user.transform())
  }
}

export default new AuthController
