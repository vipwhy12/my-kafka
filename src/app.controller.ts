import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  kafkaClient: ClientKafka;

  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA') kafkaClient: ClientKafka,
  ) {
    this.kafkaClient = kafkaClient;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendKafka(@Body() text: object) {
    this.kafkaClient.emit('chat2', text);
  }
}
