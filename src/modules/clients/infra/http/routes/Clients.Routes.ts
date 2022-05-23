import { Router } from 'express';
import CRUDClientsController from '@modules/clients/infra/http/controller/CRUDClientsController';
import FindClientsByIdController from '../controller/FindClientsByIdController';
import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import { storage } from '@infra/config/UploadFiles';
import multer from 'multer';
import UploadFilesController from '../controller/UploadFilesController';

const upload = multer({ storage: storage });
const clientsRoutes = Router();

const crudClientsController = new CRUDClientsController();
const findClientsByIdController = new FindClientsByIdController();

clientsRoutes.post('/', crudClientsController.create);
clientsRoutes.use(ensureAuthenticated);
clientsRoutes.patch('/', crudClientsController.update);
clientsRoutes.get('/', crudClientsController.index);
clientsRoutes.get('/:id', findClientsByIdController.find);
clientsRoutes.delete('/:id', crudClientsController.delete);
clientsRoutes.post(
  '/upload',
  upload.single('file'),
  UploadFilesController.uploadFile,
);

export default clientsRoutes;
