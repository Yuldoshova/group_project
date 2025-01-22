import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto{
    @ApiProperty({ example: 'Tashkent!', description: 'City address entered for address', required: false })
    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    street: string


    @ApiProperty({ example: "3-Ozar 73-dom", description: 'ID of the district being addressed' })
    @IsString()
    @IsNotEmpty()
    house_number: string

    @ApiProperty({ example: 1, description: 'ID of the district being addressed' })
    @IsInt()
    district_id: number

}