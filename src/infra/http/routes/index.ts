import { Router } from 'express';
import v1Routes from '@infra/http/routes/v1';
import swaggerUi from 'swagger-ui-express';
import dataSource from '@infra/typeorm';
import fs from 'fs';
import yaml from 'js-yaml';

const fileContents = fs.readFileSync('swagger.yml', 'utf8');
const swaggerDocument: any = yaml.load(fileContents);
const appRoutes = Router();

appRoutes.get('/health-check', async (req, res) => {
  if (dataSource.isInitialized) {
    return res.status(200).json({
      success: {
        type: 'SUCCESS_REQUEST',
        server: 'Is online',
        database: 'Is connected',
        message: 'The application is healthy.',
      },
    });
  }

  return res.status(500).json({
    success: {
      type: 'ERROR_REQUEST',
      server: 'Is Okay',
      database: 'Error',
      message: 'The application is unhealthy',
    },
  });
});

appRoutes.use(v1Routes);
appRoutes.use(
  '/api-doc/v1',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

appRoutes.all('*/*', (req, res) => {
  return res.status(404).json({
    error: {
      errorType: 'RESOURCE_NOT_FOUND',
      message: `Cannot found resource ${req.method} ${req.path}`,
    },
  });
});

export default appRoutes;
