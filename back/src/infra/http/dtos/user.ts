import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
