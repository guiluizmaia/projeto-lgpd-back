import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';

@Entity('historicClients')
class HistoricClients {
  @ObjectIdColumn()
  id: string;

  @Column()
  id_client: string;

  @Column()
  type: string;

  @Column()
  client: Clients;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = new ObjectId().toString();
  }
}

export default HistoricClients;
