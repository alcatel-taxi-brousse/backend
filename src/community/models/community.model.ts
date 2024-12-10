import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';
import { CommunityEntity } from '../../common/entities/community.entity';

export type Community = Partial<Bubble> & Partial<CommunityEntity>;
