import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskDetail } from './taskDetail.model';
import { post } from '@typegoose/typegoose';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return await this.taskService.createTask(task);
    }

    @Get()
    async getAll(): Promise<Task[] | null> {
        return await this.taskService.getAllTasks();
    }
    @Get('taskWithDetail')
    async getBoth(): Promise<Task> {
        return await this.taskService.getFromBothCollection();
    }

    @Get(':id')
    async getById(@Param('id') taskId: string): Promise<Task> {
        return await this.taskService.getTaskById(taskId);
    }

    @Patch(':id')
    async updateById(@Param('id') taskId: string,
        @Body('status') status: string,
    ): Promise<Task> {
        return await this.taskService.updateTaskById(taskId, status);
    }

    @Delete(':id')
    async deleteById(@Param('id') taskId: string): Promise<Task> {
        return await this.taskService.deleteTaskById(taskId);
    }

    @Post('detail')
    async createDeatil(@Body() detail: TaskDetail): Promise<TaskDetail> {
        return await this.taskService.createInDetailCollection(detail);
    }

    

    @Get('/TaskLevel/:level')
    async getByLevel(@Param('level') taskLevel: number): Promise<Task> {
        return await this.taskService.getTaskByLevel(taskLevel);
    }


}