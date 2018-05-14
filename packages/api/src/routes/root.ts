import * as express from 'express';
import { Router } from 'express';
import { CakesController } from '../controllers/cakes';

const Root = '/';

export const RootRoute: Router = express.Router().get(Root, CakesController.allText);
