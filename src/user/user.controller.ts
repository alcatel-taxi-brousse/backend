import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('users')
export class UserController {
  
  @Get()
  findAll() {
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Post()
  create(@Body() createUserDto: any) {
    
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
  }
}
