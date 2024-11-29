import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotImplementedException,
  Logger,
  Optional,
} from '@nestjs/common';
import { Trip } from '../db/entities/trip.entity';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    @Optional()
    private readonly logger = new Logger(TripController.name),
  ) {}

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripService.findOne(id);
  }

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripService.create(createTripDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTripDto: any): Trip {
    throw new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Trip {
    throw new NotImplementedException();
  }
}
