import express, {Router} from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app: express.Application = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor({port, routes}: Options) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}