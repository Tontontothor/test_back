import { DomainError } from './domainError';

class InternalError extends DomainError {
    private data: { error: string, code: number };

    constructor(error: string) {
      super(error);
      this.data = { error, code: 500 };
    }
}

export { InternalError };
