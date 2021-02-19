import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto, { BinaryLike } from 'crypto';
import jwt from 'jsonwebtoken';
import { Environment } from '../shared/environment';
import { IUser } from './interfaces/IUser';

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: /^[a-zA-Z0-9]+$/, index: true
  },
  email: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: /\S+@\S+\.\S+/, index: true
  },
  password: String
}, { timestamps: true });

userSchema.plugin(uniqueValidator, { message: 'is already taken' });

userSchema.methods.setPassword = function (password: BinaryLike): void {
  this.password = crypto.pbkdf2Sync(password, Environment.jwtSecret, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password: BinaryLike): boolean {
  const hash: String = crypto.pbkdf2Sync(password, Environment.jwtSecret, 10000, 512, 'sha512').toString('hex');

  return this.password === hash;
};

userSchema.methods.generateJwt = function (): string {
  const today: Date = new Date();
  const exp: Date = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: exp.getTime() / 1000
  }, Environment.jwtSecret);
};

userSchema.methods.toJson = function (): Object {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJwt()
  };
};

userSchema.methods.toMigrate = function (): Object {
  return {
    username: this.username,
    email: this.email,
    password: this.password,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);

export { User };
