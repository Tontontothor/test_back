import { DomainError } from './domainError';

class ResourceNotFoundError extends DomainError {
    private data: { error: string; code: number };

    constructor(error: string) {
      super(error);
      this.data = { error, code: 404 };
    }
}

export { ResourceNotFoundError };
