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
import { Group } from '../db/entities/group.entity';

@Controller('groups')
export class GroupController {
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
