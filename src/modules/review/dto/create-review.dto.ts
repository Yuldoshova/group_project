import { ApiProperty } from '@nestjs/swagger';
import { reviewValue } from 'src/utils';
import {
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateReviewDto {
    @ApiProperty({ example: 'Great product!', description: 'User comment for the review', required: false })

    @IsOptional()
    @IsString()
    comment?: string;
  
    @ApiProperty({ example: 1, description: 'ID of the product being reviewed' })
    @IsOptional()
    @IsInt()
    product_id: number;
  

    @ApiProperty({ example: 1, description: 'ID of the user writing the review' })
    @IsInt()
    @IsOptional()
    user_id: number;
  
    
    @ApiProperty({
      example: reviewValue.GOOD,
      description: 'Review value as an enum',
      enum: reviewValue,
      required: false,
      default: reviewValue.AVERAGE
    })
    @IsOptional()
    @IsEnum(reviewValue)
    value?: reviewValue;
  }
  
  