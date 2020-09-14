import { prop } from '@typegoose/typegoose';
export class Task {
    @prop({ required: true })
    task: string
    @prop({ required: true })
    status: string
    @prop({ required: true })
    level: number
    @prop({ required: true })
    taskCreatedAt: Date
}