import cookieSessions from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSessions({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
