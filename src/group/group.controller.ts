import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotImplementedException,
  NotFoundException
} from '@nestjs/common';
import { Group } from '../db/entities/group.entity';
import { Trip } from 'src/db/entities/trip.entity';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService : GroupService){}

  @Get()
  findAll(): void {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Group {
    throw new NotImplementedException();
  }

  @Post()
  create(@Body() createGroupDto: any): Group {
    throw new NotImplementedException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: any): Group {
    throw new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Group {
    throw new NotImplementedException();
  }

}
