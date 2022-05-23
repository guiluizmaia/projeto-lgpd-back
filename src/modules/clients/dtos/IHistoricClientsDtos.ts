import Clients from '@modules/clients/infra/typeorm/schemas/Clients';

interface IHistoricClientsDtos {
  id_client: string;
  type: string;
  client?: Clients;
}
export default IHistoricClientsDtos;
