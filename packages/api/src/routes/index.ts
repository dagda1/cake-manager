import * as express from 'express';
import { CakesRoute } from './cakes';

interface Router {
  path: string;
  handler: express.Router;
}

export const Router: Router[] = [
  {
    handler: CakesRoute,
    path: '/cakes'
  }
];
