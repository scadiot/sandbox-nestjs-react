import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignupUseCase } from 'src/domain/use-cases/user/signup';
import { SignupDto, UserDto, SigninDto } from '../dtos';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from 'src/infra/http/services/auth';
import { AuthGuard } from '../services/auth.guard';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Allows a new user to sign up.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful signup.',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async signup(@Body() userData: SignupDto): Promise<UserDto> {
    return await this.signupUseCase.execute(userData);
  }

  //@HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SigninDto): Promise<string> {
    return this.authService.signIn({ email: signInDto.email });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req): Promise<string> {
    return req.user;
  }
}
