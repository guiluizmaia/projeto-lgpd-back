import clientsRoutes from '@modules/clients/infra/http/routes/Clients.Routes';
import { Router } from 'express';
import authenticateRoutes from '@modules/clients/infra/http/routes/Authenticate.Routes';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/clients', clientsRoutes);

export default v1Routes;
