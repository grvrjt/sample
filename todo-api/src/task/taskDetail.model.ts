import { prop } from "@typegoose/typegoose";

export class TaskDetail{
    @prop({ required: true })
    level: number
    @prop({ required: true })
    detail: string
}