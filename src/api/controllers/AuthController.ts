import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import Controller from './Controller'
import User from '../models/User'
import Role from '../models/Role'

class AuthController extends Controller {
  config: any

  constructor() {
    super()
    this.config = require('../config/app.json')
  }

  createUser = (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      username: 'required|min:3|max:20',
      email: 'required|email',
      password: 'required|min:6|max:64'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    User.findOne({
      where: {
        [Op.or]: [{ name: req.body.username }, { email: req.body.email }]
      }
    }).then(user => {
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

      const hashedPassword = bcrypt.hashSync(req.body.password, 8)

      User.create({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword
      }).then(user => {
        user = user.get({ plain: true })
        delete user.password
        return res.send(user)
      })
    })
  }

  login = (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      email: 'required|email',
      password: 'required|min:6|max:64'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    User.findOne({ include: [Role], where: { email: req.body.email } }).then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password.' })
      }

      const token = jwt.sign({ id: user.id }, this.config.auth.secret, {
        expiresIn: 86400
      })

      user = user.get({ plain: true })
      delete user.password

      res.send({ user, token })
    })
  }

  me = (req: Request, res: Response) => {
    let token = req.headers['x-access-token']

    if (!token) {
      return res.status(401).send({ message: 'No token provided.' })
    }

    jwt.verify(token, this.config.auth.secret, (error, decoded) => {
      if (error) {
        return res.status(500).send({ message: 'Failed to authenticate token.' })
      }

      User.findOne({ include: [Role], where: { id: decoded.id } }).then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User not found.' })
        }

        user = user.get({ plain: true })
        delete user.password

        return res.send(user)
      })
    })
  }
}

export default new AuthController
