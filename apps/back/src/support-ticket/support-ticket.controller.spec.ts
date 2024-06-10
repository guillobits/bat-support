import { Test, TestingModule } from '@nestjs/testing';
import { SupportTicketController } from './support-ticket.controller';
import { SupportTicketService } from './support-ticket.service';
import { CreateSupportTicketDto } from 'shared-types';
import { faker } from '@faker-js/faker/locale/fr';

describe('SupportTicketController', () => {
  let supportTicketController: SupportTicketController;
  let supportTicketService: SupportTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportTicketController],
      providers: [
        {
          provide: SupportTicketService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              authorId: 1,
              paymentMethod: 'ONLINE',
              createdAt: new Date(),
            }),
          },
        },
      ],
    }).compile();

    supportTicketController = module.get<SupportTicketController>(SupportTicketController);
    supportTicketService = module.get<SupportTicketService>(SupportTicketService);
  });

  it('should be defined', () => {
    expect(supportTicketController).toBeDefined();
  });

  describe('create', () => {
    it('should create a support ticket', async () => {
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
        answers: [],
        paymentMethod: 'ONLINE',
      };

      const result = await supportTicketController.create(createSupportTicketDto);
      expect(result).toEqual({
        id: 1,
        authorId: 1,
        paymentMethod: 'ONLINE',
        createdAt: expect.any(Date),
      });

      expect(supportTicketService.create).toHaveBeenCalledWith(createSupportTicketDto);
    });

    it('should throw an error if the service fails', async () => {
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
        answers: [],
        paymentMethod: 'ONLINE',
      };

      jest.spyOn(supportTicketService, 'create').mockRejectedValueOnce(new Error('Service Error'));

      await expect(supportTicketController.create(createSupportTicketDto)).rejects.toThrow('Service Error');
    });
  });
});
