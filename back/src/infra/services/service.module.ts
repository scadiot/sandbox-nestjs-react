import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { IndexationService } from './indexation.service';

@Module({
  providers: [PasswordService, IndexationService],
  exports: [PasswordService, IndexationService],
})
export class ServiceModule {}
