import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';
import { reviewValue } from 'utils/review-value.enum';

export class UpdateReviewDto {
  @ApiProperty({
    example: 'Updated comment!',
    description: 'Updated user comment for the review',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user writing the review',
    required: false,
  })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the product being reviewed',
    required: false,
  })
  @IsOptional()
  @IsInt()
  product_id?: number;

  @ApiProperty({
    example: reviewValue.BAD,
    description: 'Updated review value as an enum',
    enum: reviewValue,
    required: false,
  })
  @IsOptional()
  @IsEnum(reviewValue)
  value?: reviewValue;
}
