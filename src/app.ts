import express from 'express';
import { Database } from './database';
import { Environment } from './shared/environment';
import { AuthRoute } from './routes/auth';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';

class App {
    static app: express.Application = express();

    static init(): void {
      this.app.use(cors());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    static start(): void {
      const server: http.Server = http.createServer(this.app);
      const authRoute: AuthRoute = new AuthRoute(this.app);

this.init();
      Database.connect(() => {
        authRoute.setRoutes();

        server.listen(Environment.port, () => {
          console.debug(`App is listening on port ${Environment.port} !`);
        });
      });
    }
}

export { App };
