import CreateClientsWithBasicsService from '@modules/clients/services/CreateClientsWithBasicsService';
import DeleteClientsService from '@modules/clients/services/DeleteClientsService';
import IndexClientsService from '@modules/clients/services/IndexClientsService';
import UpdateClientsService from '@modules/clients/services/UpdateClientsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CRUDClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const created = await container
      .resolve(CreateClientsWithBasicsService)
      .execute(data);

    return response.status(201).json(created);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const index = await container.resolve(IndexClientsService).execute();

    return response.status(200).json(index);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const updated = await container.resolve(UpdateClientsService).execute(data);

    return response.status(200).json(updated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await container.resolve(DeleteClientsService).execute(id);

    return response.status(204).json();
  }
}

export default CRUDClientsController;
