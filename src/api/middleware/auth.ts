import { verifyJWT } from '../utils/auth'
import { Policy } from '../policy'
import { User } from '../entities/User'

export async function checkAuthState (req, res, next) {
  let token = req.headers['x-access-token']

  if (!token) {
    next()
  } else {
    const decoded = await verifyJWT(token)
    const user = await User.findOne({ relations: ['roles'], where: { id: decoded.id } })

    if (user) {
      req.user = user
    }

    next()
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

  const hasPermission = await Policy.check(permission, req.user, req.params)

  if (hasPermission) {
    next()
  } else {
    res.status(401).send({ message: "Unauthorized" })
  }
}
