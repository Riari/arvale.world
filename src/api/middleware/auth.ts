import { verifyJWT } from '../utils/auth'
import Policy from '../policy/Forum'
import ForumPolicy from '../policy/Forum'
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

  const type = parts[1]
  const permission = parts.join('.')

  const policyMap = {
    forum: ForumPolicy
  }

  const policy = policyMap[type] ? new policyMap[type]() : new Policy

  const hasPermission = await policy.check(permission, req.user, req.params, req.body)

  return hasPermission ? next() : res.status(401).send({ message: "Unauthorized" })
}
