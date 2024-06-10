import { Test, TestingModule } from '@nestjs/testing';
import { SupportTicketService } from './support-ticket.service';
import { PrismaService } from '../prisma/prisma.service';
import { SupportTicket } from '@prisma/client';
import { CreateSupportTicketDto } from 'shared-types';
import { faker } from '@faker-js/faker/locale/fr';

describe('SupportTicketService', () => {
  let service: SupportTicketService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportTicketService,
        {
          provide: PrismaService,
          useValue: {
            supportTicket: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SupportTicketService>(SupportTicketService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a support ticket', async () => {
      const createSupportTicketDto: CreateSupportTicketDto = {
        author: {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          zipcode: '12345',
          phoneNumber: '1234567890',
          marketingOptin: true,
        },
        answers: [
          {
            answerId: 1,
            questionId: 1,
          },
        ],
        paymentMethod: 'ONLINE',
      };

      const expectedSupportTicket: SupportTicket = {
        id: 1,
        authorId: 1,
        paymentMethod: 'ONLINE',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.supportTicket, 'create').mockResolvedValue(expectedSupportTicket);

      const result = await service.create(createSupportTicketDto);
      expect(result).toEqual(expectedSupportTicket);
      expect(prismaService.supportTicket.create).toHaveBeenCalledWith({
        data: {
          author: {
            create: createSupportTicketDto.author,
          },
          answers: {
            create: createSupportTicketDto.answers,
          },
          paymentMethod: createSupportTicketDto.paymentMethod,
        },
      });
    });

    it('should throw an error if the creation fails', async () => {
      const createSupportTicketDto: CreateSupportTicketDto = {
        author: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          address: faker.location.streetAddress(),
          zipcode: faker.location.zipCode(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          marketingOptin: true
        },
        answers: [
          {
            answerId: 1,
            questionId: 1,
          },
        ],
        paymentMethod: 'ONLINE',
      };

      jest.spyOn(prismaService.supportTicket, 'create').mockRejectedValueOnce(new Error('Creation failed'));

      await expect(service.create(createSupportTicketDto)).rejects.toThrow('Creation failed');
    });
  });
});
