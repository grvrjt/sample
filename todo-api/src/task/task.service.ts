import { Injectable } from "@nestjs/common";
import { Task } from "./task.model"
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { TaskDetail } from "./taskDetail.model";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from 'bull';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>,
        @InjectModel(TaskDetail) private readonly taskDetailModel: ReturnModelType<typeof TaskDetail>,
        @InjectQueue('log') private readonly logQueue: Queue
    ) { }

    async createTask(createTaskDto: Task): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        const task = await createdTask.save();
        await this.logQueue.add('createTask', createTaskDto, { delay: 30000,removeOnComplete:true });  //adding a job (named createdTask) to the queue.
        return task;
    }

    async getAllTasks(): Promise<Task[] | null> {
        let result: any[] = [];
        result = await this.taskModel.find().exec();
        return result;
    }

    async getTaskById(taskId: string): Promise<Task> {
        return await this.taskModel.findById(taskId);

    }

    async getTaskByLevel(taskLevel: number): Promise<Task> {
        return await this.taskModel.find({ level: taskLevel })
    }

    async updateTaskById(taskId: string, status: string): Promise<Task> {
        return await this.taskModel.findOneAndUpdate({ _id: new ObjectId(taskId) }, { status: status }, { new: true })
    }

    async deleteTaskById(taskId: string): Promise<Task> {
        return await this.taskModel.findByIdAndDelete(taskId);
    }

    async createInDetailCollection(createDetailDto: { level: number, detail: string }): Promise<TaskDetail> {
        const createdDetail = new this.taskDetailModel(createDetailDto);
        return await createdDetail.save();
    }
    // From here aggregation will be used for practice Start
    async getFromBothCollection(): Promise<Task | any> {
        console.log("hello gaurav")
        return await this.taskModel.aggregate([{
            $lookup: {
                from: 'taskdetails',
                localField: 'level',
                foreignField: 'level',
                as: 'wholeTaskDetail'
            }
        }]);
    }

    async getByAggregate(): Promise<Task | any> {
        return await this.taskModel.aggregate([
            {
                $match: { status: "complete" }
            },
            {
                $group: { _id: "$level" }
            }
        ]);
    }

    // Aggragation ends here.
}