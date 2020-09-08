import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModule } from 'task/task.module';
import { atCreation, atListing, atBylevel } from 'task/task.middleware';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost:27017/todoDB'), TaskModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(atCreation)
      .forRoutes({ path: 'task', method: RequestMethod.POST });
    consumer
      .apply(atListing)
      .forRoutes({ path: 'task', method: RequestMethod.GET });
    consumer
      .apply(atBylevel)
      .forRoutes({ path: 'task/level', method: RequestMethod.GET })
  }


}
