import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { Role } from './Role'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  verified: boolean

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number

  @ManyToMany(type => Role, role => role.users)
  roles: Role[]

  static queryBuilder () {
    return this.createQueryBuilder('user')
  }

  static findByNameOrEmail (name: string, email: string) {
    return this.queryBuilder()
      .where('user.name = :name', { name })
      .orWhere('user.email = :email', { email })
      .getOne()
  }
}
