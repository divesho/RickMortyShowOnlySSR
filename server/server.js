import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import path from 'path'

import apiRoutes from './api/routes';
import DBInitCall from './db/init';
import CONFIG from './config';
import serverRenderer from './serverRenderer';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', serverRenderer);
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api', apiRoutes);
app.get('*', serverRenderer);

app.listen(CONFIG.port, () => {
  console.log(`SSR running on port ${CONFIG.port}`)
});

mongoose.connect(
  `${CONFIG.db.host}${CONFIG.db.db}`,
  {useFindAndModify: false, useNewUrlParser: true}
)
.then(()=> {
  
  DBInitCall();
})
.catch(err => {
  
  console.log("--> Error: ", err);
});