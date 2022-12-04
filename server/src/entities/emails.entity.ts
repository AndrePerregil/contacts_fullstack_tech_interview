import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("emails")
export class Email {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50, unique: true })
  content: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
