import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm'
import NodeCache from 'node-cache'

const permissions = require('../policy/permissions')
const cache = new NodeCache({ stdTTL: 60 })

import { Article } from './Article'
import { ForumThread } from './ForumThread'
import { ForumPost } from './ForumPost'
import { Role } from './Role'

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column({ select: false })
  password: string

  @Column({ default: false })
  verified: boolean

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number

  @ManyToMany(type => Role, role => role.users)
  roles: Role[]

  @OneToMany(type => ForumThread, thread => thread.author)
  threads: ForumThread[]

  @OneToMany(type => ForumPost, post => post.thread)
  posts: ForumPost[]

  @OneToMany(type => Article, article => article.author)
  articles: Article[]

  static queryBuilder () {
    return this.createQueryBuilder('user')
  }

  static findByNameOrEmail (name: string, email: string) {
    return this.queryBuilder()
      .where('user.name = :name', { name })
      .orWhere('user.email = :email', { email })
      .getOne()
  }

  get roleList () {
    const roleList = []

    if (this.roles) {
      this.roles.forEach(role => roleList.push(role.name))
    }

    return roleList
  }

  transform () {
    const cacheKey = `user.${this.id}.permissions`

    let userPermissions = cache.get(cacheKey)

    if (userPermissions == undefined) {
      const userPerms = []

      Object.keys(permissions).forEach(permission => {
        const roles = permissions[permission]
        const hasRole = roles.some(role => this.roleList.includes(role))

        if (hasRole) {
          userPerms.push(permission)
        }
      })

      cache.set(cacheKey, userPerms)
      userPermissions = userPerms
    }

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
      roleList: this.roleList,
      permissionList: userPermissions
    }
  }
}
