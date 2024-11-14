import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('trips')
export class TripController {
  
  @Get()
  findAll() {
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Post()
  create(@Body() createTripDto: any) {
    
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTripDto: any) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
  }
}
