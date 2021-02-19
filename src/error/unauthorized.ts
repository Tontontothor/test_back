import { DomainError } from './domainError';

class Unauthorized extends DomainError {
    private data: { error: string, code: number };

    constructor(error: string) {
      super(error);
      this.data = { error, code: 401 };
    }
}

export { Unauthorized };
