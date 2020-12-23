import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { ReturnModelType } from '@typegoose/typegoose';
import { DoneCallback, Job } from 'bull';
import { InjectModel } from 'nestjs-typegoose';
import { Log } from '../log/log.model';

@Processor('log')
export class LogConsumer {
  constructor(@InjectModel(Log) private readonly logModel: ReturnModelType<typeof Log>) { }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    console.log(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
  }


  @Process('createTask') //job named as 'createTask'
  async saveLog(job: Job, done: DoneCallback) {
    const logData = job.data;
    const createdlog = await new this.logModel(logData);
    const log = await createdlog.save();

    done(null, log);//this will goto the onComplete() method 

  }
}
