import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LinkPrecedenceEnum } from "../../utils/helper";

@Entity()
export default class Contact extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: true }) phoneNumber: string;
  @Column({ nullable: true }) email: string;
  @Column({ nullable: true }) linkedId: number;
  @Column({ enum: LinkPrecedenceEnum }) linkPrecedence: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn({ nullable: true }) deletedAt: Date;
}
