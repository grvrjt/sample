/* eslint-disable no-unused-vars */
import * as mongoose from 'mongoose';
import { prop, modelOptions } from '@typegoose/typegoose';

// eslint-disable-next-line no-shadow
// export enum LogType {
//   INFO = 'info',
//   WARN = 'warn',
//   DEBUG = 'debug',
//   ERROR = 'error',
// }

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
export class Log {
  _id?: mongoose.Types.ObjectId;

 @prop()
 task:string;
}
