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

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[]

}
