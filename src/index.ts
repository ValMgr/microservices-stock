import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { routes } from './routes';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

routes(app);

app.get('/api/ping', (req, res) => {
  res.send({ message: 'pong' });
});

app.get('/api', (req, res) => {
  res.send({ version: '1.0.0', message: 'ECV - Microservices' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000 ✅');
});
