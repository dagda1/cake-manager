import * as express from 'express';
import { CakesRoute } from './cakes';
import { RootRoute } from './root';

interface Router {
  path: string;
  handler: express.Router;
}

export const Router: Router[] = [
  {
    handler: CakesRoute,
    path: '/cakes'
  },
  {
    handler: RootRoute,
    path: '/'
  }
];
