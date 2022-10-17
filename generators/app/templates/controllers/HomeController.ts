import * as express from 'express';
import Controller from './Controller';

class HomeController extends Controller {
  public home(req: express.Request, res: express.Response): void {
    res.render('home/index.hbs');
  }
}

export default HomeController;
