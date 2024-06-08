import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma  } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
  ): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: questionWhereUniqueInput,
      include: {
        answers: {
          orderBy: [
            {
              id: 'asc'
            }
          ]
        },
      }
    });
  }
}
