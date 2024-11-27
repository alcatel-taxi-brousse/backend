import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import { Trip } from '../db/entities/trip.entity';

@Controller('trips')
export class TripController {
  @Get()
  findAll(): Trip {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Trip {
    throw new NotImplementedException();
  }

  @Post()
  create(@Body() createTripDto: any): Trip {
    throw new NotImplementedException();
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
