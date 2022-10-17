import * as express from 'express';
import HomeController from '../controllers/HomeController';

class HomeRouter {
  private readonly router: express.Router;
  private readonly controller: HomeController;

  constructor() {
    this.router = express.Router();
    this.controller = new HomeController();

    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.use('/', this.controller.home);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default HomeRouter;
