import mongoose from 'mongoose';

interface IGeneric extends mongoose.Document{
    toJson(): Object;
    toMigrate(): Object;
}

export { IGeneric };
