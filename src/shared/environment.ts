import config from 'config';

class Environment {
    static port: string = config.get('app.port');

    static dbUri: string = config.get('db-uri');

    static jwtSecret: string = config.get('jwt-secret');

    static apiKey: string = config.get('api-key');
}

export { Environment };
