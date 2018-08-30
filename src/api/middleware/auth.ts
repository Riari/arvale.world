import { verifyJWT } from '../utils/auth'
import { Policy } from '../policy'
import { User } from '../entities/User'

export async function checkAuthState (req, res, next) {
  let token = req.headers['x-access-token']

  if (!token) {
    next()
  } else {
    verifyJWT(token)
      .then(async decoded => {
        const user = await User.findOne({ relations: ['roles'], where: { id: decoded.id } })

        if (user) {
          req.user = user
        }

        next()
      })
      .catch(error => next())
  }
}

export async function checkPermissions (req, res, next) {
  const parts = []
  parts.push(req.method.toLowerCase())

  const join = part => {
    if (part.length > 0 && !part.startsWith(':')) {
      parts.push(part)
    }
  }

  req.baseUrl.toLowerCase().split('/').forEach(join)
  req.route.path.split('/').forEach(join)

  const permission = parts.join('.')

  const policy = new Policy

  const hasPermission = await policy.check(permission, req.user, req.params, req.body)

  if (hasPermission) {
    next()
  } else {
    res.status(401).send({ message: "Unauthorized" })
  }
}
