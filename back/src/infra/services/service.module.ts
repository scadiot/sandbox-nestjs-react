import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { IndexationService } from './indexation.service';
import { CustomLogger } from './custom-logger.service';
import { MailService } from './mail.service';

@Module({
  providers: [PasswordService, IndexationService, CustomLogger, MailService],
  exports: [PasswordService, IndexationService, CustomLogger, MailService],
})
export class ServiceModule {}
