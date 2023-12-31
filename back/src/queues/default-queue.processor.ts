import { Injectable } from '@nestjs/common';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { IndexPostsUseCase } from 'src/use-cases/post/index-post';

@Injectable()
@Processor('defaultQueue')
export class DefaultQueueProcessor extends WorkerHost {
  constructor(private readonly indexPostsUseCase: IndexPostsUseCase) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'INDEX_POST':
        this.indexPostsUseCase.execute(job.data);
        break;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    //console.log('user created');
  }
}
