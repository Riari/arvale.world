import { Table, Column, Model} from 'sequelize-typescript'

@Table({
  tableName: 'verifications'
})
export default class Verification extends Model<Verification> {

  @Column
  model: string

  @Column
  modelId: number

  @Column
  code: string

}
