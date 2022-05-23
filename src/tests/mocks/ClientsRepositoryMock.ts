import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import { ObjectID } from 'typeorm';

class ClientsRepositoryMock implements IClientsRepository {
  private inMemory: Clients[] = [];

  async create(dataBasics: IClientsBasicDtos): Promise<Clients> {
    const create: Clients = new Clients();

    Object.assign(create, dataBasics);

    this.inMemory.push(create);

    return create;
  }

  async findById(id: string): Promise<Clients | null> {
    const find = this.inMemory.find(client => client.id === id);

    if (find) {
      return find;
    }

    return null;
  }

  async findByEmail(email: string): Promise<Clients | null> {
    const find = this.inMemory.find(client => client.email === email);

    if (find) {
      return find;
    }

    return null;
  }

  async save(client: Clients): Promise<Clients> {
    const index = this.inMemory.findIndex(
      (client, index) => client.id === client.id,
    );

    if (index === -1) {
      const clientSave = new Clients();

      Object.assign(clientSave, client);

      this.inMemory.push(clientSave);

      return clientSave;
    }

    const clientSave = this.inMemory[index];

    Object.assign(clientSave, client);

    this.inMemory.splice(index, 1);

    this.inMemory.push(clientSave);

    return clientSave;
  }

  async index(): Promise<Clients[]> {
    return this.inMemory;
  }

  async delete(id: string): Promise<void> {
    const index = this.inMemory.findIndex(client => client.id === id);

    if (index != -1) {
      this.inMemory.splice(index, 1);
    }
  }
}

export default ClientsRepositoryMock;
