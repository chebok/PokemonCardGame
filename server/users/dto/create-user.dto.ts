import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Length(4, 6)
  @IsString({ message: 'Не указан пароль' })
  password: string;

  @IsNotEmpty()
  @IsString({ message: 'Не указано имя' })
  username: string;
}