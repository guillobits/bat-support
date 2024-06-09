import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const question = await this.questionService.findOne({id: +id});
    if (question) {
      return question
    }
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'The question was not found',
    }, HttpStatus.NOT_FOUND);
  }
}
