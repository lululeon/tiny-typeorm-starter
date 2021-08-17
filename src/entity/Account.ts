import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

// see: https://typeorm.io/#/entities/column-types
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number
}
