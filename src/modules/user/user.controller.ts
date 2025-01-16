import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-users.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @ApiTags('user')
  @Controller({ version: "1", path:"user"})
  export class UserController {
    constructor(private readonly userService: UserService) { }
  
    @Post('/add')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({ status: 200, description: 'List of all users retrieved successfully.' })
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(+id);
    }
  
    @Patch('/update/:id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'The user has been deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.userService.remove(id);
    }
  }
  