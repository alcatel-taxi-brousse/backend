import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from './community/community.controller';
import { CommunityService } from './community/community.service';

describe('AppController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [CommunityService],
    }).compile();
  });

  describe('root', () => {});
});
