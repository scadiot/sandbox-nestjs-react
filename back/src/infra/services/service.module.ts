import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { IndexationService } from './indexation.service';
import { CustomLogger } from './custom-logger.service';

@Module({
  providers: [PasswordService, IndexationService, CustomLogger],
  exports: [PasswordService, IndexationService, CustomLogger],
})
export class ServiceModule {}
