import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const config = require('../config/app.json')

export function hashPassword (password: string): string {
  return bcrypt.hashSync(password, 8)
}

export function verifyPassword (password1: string, password2: string): boolean {
  return bcrypt.compareSync(password1, password2)
}

export function signJWT (payload: any): object {
  return jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.lifetime
  })
}

export function verifyJWT (token: any): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.auth.secret, (error, decoded) => {
      if (error) {
        return reject(error)
      }

      return resolve(decoded)
    })
  })
}
