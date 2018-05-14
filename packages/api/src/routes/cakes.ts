import * as express from 'express';
import { Router } from 'express';
import { CakesController } from '../controllers/cakes';

const CakesUrl = '/';

export const CakesRoute: Router = express
  .Router()
  .get(CakesUrl, CakesController.all)
  .post(CakesUrl, CakesController.create);
