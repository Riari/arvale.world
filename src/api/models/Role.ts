import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'

import User from './User'
import UserRole from './Role'

@Table({
  tableName: 'roles'
})
export default class Role extends Model<Role> {

  @Column
  name: string

  @Column
  colour: string

  @BelongsToMany(() => User, () => UserRole, 'id', 'id')
  users: User[]

}
