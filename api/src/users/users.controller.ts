import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiImplicitHeader,
  ApiResponse,
  ApiImplicitBody,
} from '@nestjs/swagger';
import { UserGTO } from './gto/user.gto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ description: 'logined in system, send access_token' })
  @ApiResponse({ status: 200, description: 'return access_token' })
  @ApiImplicitBody({ name: 'body', description: 'user login', type: UserGTO })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Return User model',
    type: UserGTO,
  })
  @ApiImplicitHeader({
    name: 'Authorization',
    description: 'Bearer [access_token]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
