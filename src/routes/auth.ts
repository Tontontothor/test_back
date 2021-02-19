import express from 'express';
import { User } from '../models/user';
import { ResponseWrapper } from '../response';
import { ResourceNotFoundError } from '../error/resourceNotFound';
import { Unauthorized } from '../error/unauthorized';
import { IUser } from '../models/interfaces/IUser';
import { ARoute } from './interface/ARoute';

class AuthRoute extends ARoute {
  constructor(app: express.Application) {
    super(app);
  }

  register(): void {
    this.app.post('/auth/register', async (req: any, res: any) => {
      try {
        const user: IUser = new User(req.body);

        user.setPassword(user.password);

        await user.save();

        ResponseWrapper.okCreated(res, user.toJson());
      } catch (e) {
        if (e._message && e._message.includes('validation')) ResponseWrapper.badRequest(res, 'Email or username already used');
        else ResponseWrapper.badRequest(res);
      }
    });
  }

  login(): void {
    this.app.post('/auth/login', async (req: any, res: any) => {
      try {
        const user: IUser = await User.findOne({
          $or: [
            { email: req.body.email },
            { username: req.body.username }
          ]
        }).exec();

        if (user === null) throw new ResourceNotFoundError('The given email or username does not match');
        else if (!user.validPassword(req.body.password)) throw new Unauthorized('The given password is incorrect.');
        else ResponseWrapper.ok(res, user.toJson());
      } catch (e) {
        if (e.data && e.data.code === 404) ResponseWrapper.notFound(res, e.data.error);
        else if (e.data && e.data.code === 401) ResponseWrapper.unauthorized(res, e.data.error);
        else ResponseWrapper.badRequest(res);
      }
    });
  }

  setRoutes(): void {
    this.login();
    this.register();
  }
}

export { AuthRoute };
