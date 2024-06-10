import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';

describe('QuestionService', () => {
  let service: QuestionService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: {
            question: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a question by unique input', async () => {
      const questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput = {
        id: 1,
      };

      const expectedQuestion: Question = {
        id: 1,
        question: 'Où se situe votre problème ?',
      };

      jest.spyOn(prismaService.question, 'findUnique').mockResolvedValue(expectedQuestion);

      const result = await service.findOne(questionWhereUniqueInput);
      expect(result).toEqual(expectedQuestion);
      expect(prismaService.question.findUnique).toHaveBeenCalledWith({
        where: questionWhereUniqueInput,
        include: {
          answers: {
            orderBy: [{ id: 'asc' }],
          },
        },
      });
    });

    it('should return null if no question is found', async () => {
      const questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput = {
        id: 1,
      };

      jest.spyOn(prismaService.question, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(questionWhereUniqueInput);
      expect(result).toBeNull();
      expect(prismaService.question.findUnique).toHaveBeenCalledWith({
        where: questionWhereUniqueInput,
        include: {
          answers: {
            orderBy: [{ id: 'asc' }],
          },
        },
      });
    });

    it('should throw an error if the service fails', async () => {
      const questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput = {
        id: 1,
      };

      jest.spyOn(prismaService.question, 'findUnique').mockRejectedValueOnce(new Error('Service Error'));

      await expect(service.findOne(questionWhereUniqueInput)).rejects.toThrow('Service Error');
    });
  });
});
