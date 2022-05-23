import 'express-async-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import appRoutes from './routes';
import AppError from './errors/AppError';

class App {
  private app: Express;
  public server: Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
    this.error();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: '*',
      }),
    );
  }

  private error() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.status_code).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          messsage: `Internal server error: ${err.message}`,
        });
      },
    );
  }

  private routes() {
    this.app.use(appRoutes);
  }
}

export default App;
