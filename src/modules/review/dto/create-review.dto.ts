import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { reviewValue } from 'utils/review-value.enum';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Great product!',
    description: 'User comment for the review',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the product being reviewed',
  })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user writing the review',
    required: false,
  })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({
    example: reviewValue.GOOD,
    description: 'Review value as an enum',
    enum: reviewValue,
    required: false,
  })
  @IsOptional()
  @IsEnum(reviewValue)
  value?: reviewValue;
}
