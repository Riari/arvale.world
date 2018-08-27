import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm'
import { User } from './User'

@Entity({ name: 'role' })
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  colour: string

  @ManyToMany(type => User, user => user.roles)
  @JoinTable()
  users: User[]

}
