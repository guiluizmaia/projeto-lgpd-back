import IHistoricClientsDtos from '@modules/clients/dtos/IHistoricClientsDtos';
import HistoricClients from '@modules/clients/infra/typeorm/schemas/HistoricClients';

interface IHistoricClientsRepository {
  create(data: IHistoricClientsDtos): Promise<HistoricClients>;
}

export default IHistoricClientsRepository;
