require('es6-promise').polyfill();
require('isomorphic-fetch');

import * as express from 'express';
import * as helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { log } from 'winston';
import { db } from './db';
import { Router } from './routes';
import { Port } from './config';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// create routes
for (const route of Router) {
  app.use(route.path, route.handler);
}

app.use(helmet());

log('info', 'Configuring api...');

app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  if (!module.parent) {
    err.stack && log('error', err.stack);
  }

  res.status(500).json({ error: 'Internal Error' });
});

app.use(function(req, res, next) {
  res.status(404);
});

app.set('port', process.env.PORT || Port);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(app.get('port'), async () => {
    log('info', `Server listening on port ${app.get('port')}...`);

    await db.initialise();

    log('info', 'db initialised....we....are....ready');
  });
}
