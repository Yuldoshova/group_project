import { IsString, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  image: string;

  @IsDateString()
  @IsNotEmpty()
  discount_date: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
