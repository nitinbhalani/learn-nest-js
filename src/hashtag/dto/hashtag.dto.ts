import { IsNotEmpty, IsString } from 'class-validator';

export class HashTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
