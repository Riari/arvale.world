import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'Users',
  timestamps: true
})
export default class User extends Model<User> {

  @Column
  name: string

  @Column
  email: string

  @Column
  password: string

}
