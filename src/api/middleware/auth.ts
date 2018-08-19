import { verifyJWT } from '../utils/auth'
import permissions from '../data/permissions'
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
  console.log(parts)

  const permission = parts.join('.')

  console.log(permission)
  const resource = await req.resourceQuery
  console.log(resource)

  next()
}
