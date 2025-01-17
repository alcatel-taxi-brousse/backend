import { Controller, Get, Query } from '@nestjs/common';
import { UserId } from '../../common/decorators/user.decorator';
import { TripEntity } from '../../common/entities/trip.entity';
import { TripService } from '../services/trip.service';
import { GetTripsDto } from '../dtos/get-trips.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('trips')
@ApiBearerAuth()
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  /**
   * Get upcoming trips for the logged-in user
   * @param userId
   * @param query
   */
  @Get('me')
  async getUpcomingTrips(
    @UserId() userId: string,
    @Query() { from, to }: GetTripsDto,
  ): Promise<TripEntity[]> {
    const fromDate = from ? new Date(from) : new Date();
    const toDate = to ? new Date(to) : undefined;
    return await this.tripService.findUpcomingTripsByUser(
      userId,
      fromDate,
      toDate,
    );
  }
}
