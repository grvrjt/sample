import { Module } from "@nestjs/common";
import { TaskController } from "./task.contoller";
import { TaskService } from "./task.service";
import { TypegooseModule } from "nestjs-typegoose";
import { Task } from "./task.model";
import { TaskDetail } from "./taskDetail.model";
import { BullModule } from "@nestjs/bull";
import { LogConsumer } from "./task.processor";
import { Log } from "src/log/log.model";

@Module({
    imports: [BullModule.forRootAsync({
        useFactory: () => ({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    }),
    BullModule.registerQueueAsync({
        name: 'log'
    }),

    TypegooseModule.forFeature([Task, TaskDetail,Log])],
    controllers: [TaskController],
    providers: [TaskService,LogConsumer]
})
export class TaskModule { }
