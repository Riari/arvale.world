import crypto from 'crypto'
import { Request, Response } from 'express'
import Controller from './Controller'
import { User } from '../entities/User'
import { Verification } from '../entities/Verification'
import {
  hashPassword,
  verifyPassword,
  signJWT,
  verifyJWT
} from '../utils/auth'

class AuthController extends Controller {
  config: any

  constructor() {
    super()
    this.config = require('../config/app.json')
  }

  createUser = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      username: 'required|min:3|max:20',
      email: 'required|email',
      password: 'required|min:6|max:64'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    let user = await User.findByNameOrEmail(req.body.username, req.body.email)

    if (user) {
      let errors: any = {}

      if (req.body.username == user.name) {
        errors.username = ['Name is already in use.']
      }

      if (req.body.email === user.email) {
        errors.email = ['Email is already in use.']
      }

      return res.status(422).send({ errors })
    }

    const hashedPassword = hashPassword(req.body.password)

    user = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    user.save()

    const verification = await Verification.create({
      model: 'User',
      modelId: user.id,
      code: crypto.randomBytes(20).toString('hex')
    })

    const action_url = this.config.base_url + '/user/verify/' + verification.code

    res.mailer.send('email/default', {
      to: user.email,
      subject: 'Welcome to Arvale.World!',
      user,
      message: `Thanks for signing up on Arvale.World. Please verify your account by visiting <a href="${action_url}">${action_url}</a> or clicking the button below.`,
      action_url,
      action_label: 'Verify account'
    }, () => {
      return res.send(user.transform())
    })
  }

  verifyUser = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      email: 'required|email',
      code: 'required'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const verification = await Verification.findOne({ where: { code: req.body.code }})

    if (!verification) {
      return res.status(404).send({ message: 'No verification found.' })
    }

    const user = await User.findOne({ where: { email: req.body.email, id: verification.modelId }})

    if (!user) {
      return res.status(404).send({ message: 'No matching user found.' })
    }

    verification.remove()
    user.verified = true
    user.save()

    const token = signJWT({ id: user.id })

    return res.send({ user: user.transform(), token })
  }

  login = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      email: 'required|email',
      password: 'required|min:6|max:64'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const user = await User.findOne({ relations: ['roles'], where: { email: req.body.email } })

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
