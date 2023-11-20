import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('defaultQueue')
export class DefaultQueueProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.name);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    //console.log('user created');
  }
}
