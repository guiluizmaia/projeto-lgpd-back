import { Router } from 'express';
import CRUDClientsController from '@modules/clients/infra/http/controller/CRUDClientsController';
import AuthenticateController from '../controller/AuthenticateController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post('/', authenticateController.login);

export default authenticateRoutes;
