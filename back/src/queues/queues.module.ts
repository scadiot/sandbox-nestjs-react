import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DefaultQueueProcessor } from './default-queue.processor';
import { UseCasesModule } from 'src/use-cases/use-cases.module';

/*
const defaultQueueConfig = BullModule.registerQueue({
  name: 'defaultQueue',
  connection: {
    host: 'localhost',
    port: 6378,
  },
});
*/
@Module({
  imports: [
    forwardRef(() => UseCasesModule),
    BullModule.registerQueue({
      name: 'defaultQueue',
      connection: {
        host: 'localhost',
        port: 6378,
      },
    }),
  ],
  providers: [DefaultQueueProcessor],
  exports: [BullModule],
})
export class QueueModule {}
