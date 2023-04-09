import express from 'express';

import config from './config';

import  appRouter  from './routes/app.router';

const app = express();

app.use(express.json());
app.use(appRouter);

app.listen(config.port, () => {
  console.log('server running');
});