import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('groups')
export class GroupController {
  
  @Get()
  findAll() {
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Post()
  create(@Body() createGroupDto: any) {
    
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: any) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   
  }
}
