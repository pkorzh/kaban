import 'express-async-errors';

import express from 'express';
import jwt from 'express-jwt';

import users from './routes/users';
import tickets from './routes/tickets';
import boards from './routes/boards';
import backlogs from './routes/backlogs';
import ping from './routes/ping';
import workflow from './routes/workflow';
import flatpages from './routes/flatpages';
import comments from './routes/comments';
import history from './routes/history';
import rank from './routes/rank';
import kabanConfiguration from './routes/kaban-configuration';
import storage from './routes/storage';
import attachments from './routes/attachments';
import serverSideEvents from './routes/server-side-events';

import { authErrorHandler, errorHandler, dbErrorHandler } from './error-handlers';

const app = express();

app.set('secret', process.env.JWT_SECRET);

app.use(
	jwt({
			secret: app.get('secret')
		}
	).unless({
		path: [
			'/api/users/login',
			'/api/ping',
			'/api/kaban-configuration/notification/telegram/handle-webhook',
			'/api/server-side-events',
		]
	})
)

app.use(serverSideEvents);
app.use(users);
app.use(tickets);
app.use(boards);
app.use(backlogs);
app.use(ping);
app.use(workflow);
app.use(flatpages);
app.use(comments);
app.use(history);
app.use(rank);
app.use(kabanConfiguration);
app.use(storage);
app.use(attachments);
app.use(authErrorHandler);
app.use(dbErrorHandler);
app.use(errorHandler);

export default {
  path: '/api',
  handler: app
};
