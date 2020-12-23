import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost:27017/todoDB'), TaskModule],
})
export class AppModule {

}
