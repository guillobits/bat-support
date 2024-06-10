import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupportTicketService } from './support-ticket.service';
import { SupportTicketController } from './support-ticket.controller';

@Module({
  controllers: [SupportTicketController],
  providers: [PrismaService, SupportTicketService],
})
export class SupportTicketModule {}
