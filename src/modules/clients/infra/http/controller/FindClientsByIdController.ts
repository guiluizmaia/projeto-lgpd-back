import FindClientsByIdService from '@modules/clients/services/FindClientsByIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class FindClientsByIdController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const find = await container.resolve(FindClientsByIdService).execute(id);

    return response.status(200).json(find);
  }
}

export default FindClientsByIdController;
