import * as express from 'express';
import { Router } from 'express';
import { CakesController } from '../controllers/cakes';

export const CakesRoute: Router = express.Router().get('/', CakesController.All);
