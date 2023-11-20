import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DefaultQueueProcessor } from './default-queue.processor';

const defaultQueueConfig = BullModule.registerQueue({
  name: 'defaultQueue',
  connection: {
    host: 'localhost',
    port: 6378,
  },
});

@Module({
  imports: [defaultQueueConfig],
  providers: [DefaultQueueProcessor],
  exports: [defaultQueueConfig],
})
export class QueueModule {}
