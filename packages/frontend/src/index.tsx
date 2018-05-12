import * as express from 'express';
import { join } from 'path';
import { log } from 'winston';
import * as path from 'path';
import { Port } from './config';

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

if (process.env.NODE_ENV === 'development') {
  configureDevelopment(app);
} else {
  configureProduction(app);
}

log('info', 'Configuring server engine...');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || Port);

app.listen(app.get('port'), () => log('info', `Server listening on port ${app.get('port')}...`));