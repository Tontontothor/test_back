import { BinaryLike } from 'crypto';
import { IGeneric } from './generic';

interface IUser extends IGeneric {
    username: string,
    email: string,
    password: string,
    createdAt: Number,
    updatedAt?: Number,
    setPassword(password: BinaryLike): void;
    validPassword(password: BinaryLike): boolean;
    generateJwt(): string;
}

export { IUser };
