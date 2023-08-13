import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LinkPrecedenceEnum } from "../../utils/helper";

@Entity()
export default class Contact extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: true }) phoneNumber: string;
  @Column({ nullable: true }) email: string;
  @Column({ nullable: true }) linkedId: number;
  @Column({ enum: LinkPrecedenceEnum }) linkPrecedence: string;
  @Column() createdAt: Date;
  @Column() updatedAt: Date;
  @Column({ nullable: true }) deletedAt: Date;
}
