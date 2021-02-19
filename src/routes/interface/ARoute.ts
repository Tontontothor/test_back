import express from 'express';

abstract class ARoute {
    app: express.Application;

    protected constructor(app: express.Application) {
      this.app = app;
    }

    abstract setRoutes(): void;
}

export { ARoute };
