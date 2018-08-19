import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'

@Entity()
export class Verification extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  model: string

  @Column()
  modelId: number

  @Column()
  code: string

}
