import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';

describe('QuestionController', () => {
  let controller: QuestionController;
  let questionService: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a question if it exists', async () => {
      const question: Question = {
        id: 1,
        question: 'What is your issue?',
      };

      jest.spyOn(questionService, 'findOne').mockResolvedValue(question);

      const result = await controller.findOne('1');
      expect(result).toEqual(question);
      expect(questionService.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw a 404 error if the question does not exist', async () => {
      jest.spyOn(questionService, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'The question was not found',
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw an error if the service fails', async () => {
      jest.spyOn(questionService, 'findOne').mockRejectedValue(new Error('Service Error'));

      await expect(controller.findOne('1')).rejects.toThrow('Service Error');
    });
  });
});
