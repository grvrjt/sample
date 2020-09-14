import { Module } from "@nestjs/common";
import { TaskController } from "./task.contoller";
import { TaskService } from "./task.service";
import { TypegooseModule } from "nestjs-typegoose";
import { Task } from "./task.model";
import { TaskDetail } from "./taskDetail.model";

@Module({
    imports:[TypegooseModule.forFeature([Task,TaskDetail])],
    controllers: [TaskController],
    providers:[TaskService]
})
export class TaskModule { }
    