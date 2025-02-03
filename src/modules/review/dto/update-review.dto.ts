import { ApiProperty } from '@nestjs/swagger';
import { reviewValue } from 'src/utils';
import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'Updated comment!', description: 'Updated user comment for the review', required: false })

  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 1, description: 'ID of the user writing the review' })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({ example: 1, description: 'ID of the product being reviewed' })
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
  @IsInt()
  value?: reviewValue;
}
