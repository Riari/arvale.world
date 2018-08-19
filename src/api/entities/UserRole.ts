import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'

import User from './User'
import Role from './Role'

@Table({
  tableName: 'user_roles'
})
export default class UserRole extends Model<UserRole> {

  @ForeignKey(() => User)
  @Column({ unique: false })
  userId: number

  @ForeignKey(() => Role)
  @Column({ unique: false })
  roleId: number

}
