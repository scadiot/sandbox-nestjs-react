import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserDto } from './user';

export class SignupDto {
  @ApiProperty({ description: "user's email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class SigninDto {
  @ApiProperty({ description: "user's email" })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class SigninResponseDto {
  @ApiProperty({ description: "user's email" })
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  user: UserDto;
}
