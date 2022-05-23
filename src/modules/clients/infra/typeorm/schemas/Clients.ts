import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ObjectId } from 'mongodb';

interface Questions {
  question: string;
  answer: string;
}

interface Result {
  [key: string]: string;
}

@Entity('clients')
class Clients {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  birthDay: Date;

  @Column()
  sex: string;

  @Column()
  genrer: string;

  @Column()
  document: string;

  @Column()
  rg: string;

  @Column()
  phone: string;

  @Column()
  address: {
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
  };
  constructor() {
    this.id = new ObjectId().toString();
  }
}

export default Clients;
