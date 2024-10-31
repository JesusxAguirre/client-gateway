import { IsOptional, IsString } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterUserDto extends LoginAuthDto {
  @IsString()
  @IsOptional()
  name: string = '';
}
