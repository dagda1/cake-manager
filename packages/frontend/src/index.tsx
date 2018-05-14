import * as express from 'express';
import { join } from 'path';
import { log } from 'winston';
import * as path from 'path';
import { Port, ApiHost } from './config';
import * as http from 'http';
import * as proxy from 'http-proxy-middleware';

const configureDevelopment = (app: any) => {
  const clientConfig = require('../../../webpack/client').configure({
    entryPoint: path.join(process.cwd(), 'src/client/index')
  });

  const publicPath = clientConfig.output.publicPath;
  const outputPath = clientConfig.output.path;

  const serverConfig = require('../../../webpack/server').configure({
    entryPoint: path.join(process.cwd(), 'src/server/index'),
    filename: 'server.js'
  });

  const multiCompiler = require('webpack')([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers.find((compiler: any) => compiler.name === 'client');

  app.use(require('webpack-dev-middleware')(multiCompiler, { serverSideRender: true }));

  app.use(require('webpack-hot-middleware')(clientCompiler));

  app.use(publicPath, express.static(outputPath));

  app.use(
    require('webpack-hot-server-middleware')(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  );
};

const configureProduction = (app: any) => {
  const clientStats = require('./stats.json');
  const serverRender = require('./server.js').default;
  const outputPath = join(process.cwd(), '.');

  app.use(
    serverRender({
      clientStats,
      outputPath
    })
  );
};

const app = express();

// set up proxying for all requests that are not text/html that should meet the requirements
// for the test
const filter = (pathname: string, req: http.IncomingMessage) => {
  const accept = req.headers.accept;

  if (!accept) {
    return false;
  }

  return pathname === '/' || accept.indexOf('application/json') > -1;
};

const apiProxy = proxy(filter, { target: ApiHost, secure: false });

app.use('/', apiProxy);

if (process.env.NODE_ENV === 'development') {
  configureDevelopment(app);
} else {
  configureProduction(app);
}

process.on('unhandledRejection', error => {
  log('error', '------------------------------');
  log('error', error.message);
  log('error', '------------------------------');
});

log('info', 'Configuring server engine...');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || Port);

app.listen(app.get('port'), () => log('info', `Server listening on port ${app.get('port')}...`));
