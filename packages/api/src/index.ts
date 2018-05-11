import * as express from 'express';
import * as helmet from 'helmet';
import { Request, Response } from 'express';
import { log } from 'winston';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ result: 'hello' });
});

app.use(helmet());

log('info', 'Configuring server engine...');

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  log('info', `Server listening on port ${app.get('port')}...`);
});
