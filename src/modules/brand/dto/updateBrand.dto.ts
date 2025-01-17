import { IsString, MaxLength } from "class-validator";

export class UpdateBrandDto {
    @IsString()
    @MaxLength(50)
    name?: string;
  }
                                          