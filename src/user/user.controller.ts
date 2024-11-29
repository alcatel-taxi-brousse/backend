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
import { UserEntity } from '../common/entities/user.entity';

@Controller('users')
export class UserController {
  @Get()
  findAll(): UserEntity {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    throw new NotImplementedException();
  }

  @Post()
  create(@Body() createUserDto: any): UserEntity {
    throw new NotImplementedException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any): UserEntity {
    throw new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): UserEntity {
    throw new NotImplementedException();
  }
}
