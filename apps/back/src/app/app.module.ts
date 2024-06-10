import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionModule } from '../question/question.module';
import { SupportTicketModule } from '../support-ticket/support-ticket.module';

@Module({
  imports: [QuestionModule, SupportTicketModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
