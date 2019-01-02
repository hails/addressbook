import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity } from 'typeorm'
import { hash } from 'bcrypt'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 15
    const passwordHash = await hash(this.password, saltRounds)

    this.password = passwordHash
  }
}
