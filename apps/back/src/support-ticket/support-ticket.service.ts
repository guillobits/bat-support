import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupportTicket  } from '@prisma/client';
import { CreateSupportTicketDto } from 'shared-types';

@Injectable()
export class SupportTicketService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSupportTicketDto): Promise<SupportTicket> {
    return this.prisma.supportTicket.create({
      data: {
        author: {
          create: data.author,
        },
        answers: {
          create: data.answers,
        },
        paymentMethod: data.paymentMethod,
      },
    });
  }
}
