import * as express from 'express';
import HomeRouter from './HomeRouter';

export default class Router {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();

    this.registerRoutes();
  }

  private registerRoutes(): void {
    const homeRouter: HomeRouter = new HomeRouter();

    this.router.use('/', homeRouter.getRouter());
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
