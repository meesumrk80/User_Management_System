import { UserService } from './user.service';
import { Body, Controller, Get, Inject, NotFoundException, Param, Post, UseGuards,Delete } from '@nestjs/common';
import { User } from './user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Role } from 'src/auth/enums/roles.enums';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    getAll(){
        return this.userService.getAll();
    }
    @Get(':id')
    getById(@Param('id' )id:number):Promise<User>{
        return this.userService.getById(id);
    }

    @Post()
    createUser(@Body() user:Partial<User>):Promise<User>{
        if(!user.password||user.name||!user.email){
            throw new NotFoundException("Required All Fields")
        }
        return this.userService.createUser(user);
    }


    // ===================== ADMIN ROUTES =====================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
