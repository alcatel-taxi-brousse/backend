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
import { User } from '../db/entities/user.entity';

@Controller('users')
export class UserController {
  @Get()
  findAll(): User {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    throw new NotImplementedException();
  }

  @Post()
  create(@Body() createUserDto: any): User {
    throw new NotImplementedException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any): User {
    throw new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): User {
    throw new NotImplementedException();
  }
}
