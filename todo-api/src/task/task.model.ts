import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true,
    },
})

export class Task {
    @prop({ required: true })
    task: string
    @prop({ required: true })
    status: string
    @prop({ required: true })
    level: number
    @prop({ required: [true,'username is required !!'] })
    username: string
}