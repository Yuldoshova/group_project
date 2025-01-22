import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  rating?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Max(10000000)
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: 'rating' | 'popularity' | 'price' = 'rating'; // example sorting
}
