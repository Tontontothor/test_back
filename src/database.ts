import mongoose from 'mongoose';

import { Environment } from './shared/environment';

class Database {
  static connect(callback: any, url?: string) {
    mongoose.set('useCreateIndex', true);

    mongoose
      .connect(url ?? Environment.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(callback);
  }
}

export { Database };
