import { Injectable } from "@nestjs/common";
import { Task } from "./task.model"
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { TaskDetail } from "./taskDetail.model";

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>,
        @InjectModel(TaskDetail) private readonly taskDetailModel: ReturnModelType<typeof TaskDetail>

    ) { }

    async createTask(createTaskDto: { task: string, status: string }): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        return await createdTask.save();
    }

    async getAllTasks(): Promise<Task[] | null> {
        var result: any[] = [];
        result = await this.taskModel.find().exec();
        return result;
    }

    async getTaskById(taskId: string): Promise<Task> {
        return await this.taskModel.findById(taskId);

    }

    async updateTaskById(taskId: string, status: string): Promise<Task> {
        return await this.taskModel.findOneAndUpdate({ _id: new ObjectId(taskId) }, { status: status })
    }

    async deleteTaskById(taskId: string): Promise<Task> {
        return await this.taskModel.findByIdAndDelete({ _id: new ObjectId(taskId) });
    }

    async createInDetailCollection(createDetailDto: { level: number, detail: string }): Promise<TaskDetail> {
        const createdDetail = new this.taskDetailModel(createDetailDto);
        return await createdDetail.save();
    }

    async getFromBothCollection(): Promise<Task | any> {
        console.log("for getting the whole detail of the task services file called !!! ")
        return await this.taskModel.aggregate([{
            $lookup: {
                from: 'taskdetails',
                localField: 'level',
                foreignField: 'level',
                as: 'wholeTaskDetail'
            }
        }]);
    }
}