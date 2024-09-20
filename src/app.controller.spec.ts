import { Test, TestingModule } from '@nestjs/testing';
import { BubblesController } from './bubbles/bubbles.controller';
import { BubblesService } from './bubbles/bubbles.service';

describe('AppController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BubblesController],
      providers: [BubblesService],
    }).compile();
  });

  describe('root', () => {});
});
