import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { QueueModule } from 'src/queues/queues.module';
@Module({
  imports: [DatabaseModule, HttpModule, QueueModule],
})
export class AppModule {}
