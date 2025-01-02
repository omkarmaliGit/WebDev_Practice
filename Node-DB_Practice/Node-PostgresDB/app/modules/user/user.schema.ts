import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ type: "varchar", nullable: false, default: "USER" })
  role: string;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
