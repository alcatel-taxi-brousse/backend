import { Injectable, NotFoundException } from '@nestjs/common';
import { Group } from '../db/entities/group.entity';
import { Trip } from '../db/entities/trip.entity';

@Injectable()
export class GroupService {
  async findTripsByGroup(id: string): Promise<Trip[]> {
    const group = await Group.findByPk(id, {
      include: {
        model: Trip,
        through: { attributes: [] }, 
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    return group.trips;
  }
}