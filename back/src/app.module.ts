import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { ServiceModule } from './infra/services/service.module';
import { QueueModule } from 'src/queues/queues.module';

@Module({
  imports: [DatabaseModule, HttpModule, QueueModule, ServiceModule],
})
export class AppModule {}
