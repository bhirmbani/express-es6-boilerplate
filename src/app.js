import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import Promise from 'bluebird';
import mongoose from 'mongoose';

// routes
import user from './routes';

require('dotenv-safe').load();

const app = express();
app.use(helmet());
app.use(cors());

// promisify mongoose lib
Promise.promisifyAll(mongoose);

// mongoose setup
const db = mongoose.connection;
mongoose.connect(`mongodb://localhost/${process.env.DB}`);
db.on('open', () => {
  console.warn(`mongodb connected to ${db.db.s.databaseName} database`);
  console.warn();
});
db.on('error', console.error.bind(console, 'connection error:'));

// port setup
app.set('port', process.env.PORT || 3000);
// log setup
app.use(logger('dev'));

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', user);

app.listen(app.get('port'), () => {
  console.warn(`app listening on ${app.get('port')}`);
});

export default app;
