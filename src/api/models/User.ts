import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'

import Role from './Role'
import UserRole from './UserRole'

@Table({
  tableName: 'users',
  timestamps: true
})
export default class User extends Model<User> {

  @Column
  name: string

  @Column
  email: string

  @Column
  password: string

  @Column
  verified: boolean

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[]

  public transform(): object {
    return {
      name: this.name,
      email: this.email,
      verified: this.verified
    }
  }

}
