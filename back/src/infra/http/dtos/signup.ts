import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: "user's email" })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class SigninDto {
  @ApiProperty({ description: "user's email" })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
