import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }
}
