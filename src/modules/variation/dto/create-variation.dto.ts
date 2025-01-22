import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateVariationDto {

    @ApiProperty({
        type: String,
        example: 'John',
        description: 'First name of the user',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty({
        type: Number,
        example: 'John',
        description: 'First name of the user',
        required: false
    })
    @IsOptional()
    @IsNumber()
    category_id: number
}
