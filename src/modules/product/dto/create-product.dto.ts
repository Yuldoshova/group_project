import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {

    @ApiProperty({
        type: String,
        required: true,
        example: "Samsung"
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        type: String,
        required: false,
        example: "description"
    })
    @IsNotEmpty()
    @IsString()
    description?: string

    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    categoryId: number

    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    brandId: number

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: Express.Multer.File
}
