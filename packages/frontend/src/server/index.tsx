import * as React from 'react';
import 'react-universal-component/server';
import { renderToString } from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks';
import { Request, Response } from 'express';
import { App } from '../containers/App';
import configureStore from '../store';

const { flushChunkNames } = require('react-universal-component/server');

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }: { clientStats: any }) => async (req: Request, res: Response) => {
  const chunkNames = flushChunkNames();

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  const preloadedState = { cakes: [] };

  const store = configureStore(preloadedState);

  const renderedContent = renderToString(<App store={store} />);

  res.status(200).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <title>Cakes r Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          ${styles}
      </head>
      <body>
        <div id="root">${renderedContent}</div>
        ${cssHash}
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        ${js}
      </body>
    </html>
`);
};
