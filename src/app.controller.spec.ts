import { Test } from '@nestjs/testing';
import { CommunityController } from './community/controllers/community.controller';
import { CommunityService } from './community/services/community.service';

describe('AppController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [CommunityService],
    }).compile();
  });

  describe('root', () => {});
});
