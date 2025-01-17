import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateAddressDto{
    @IsString()
    @IsOptional()
    city: string

    @IsString()
    @IsOptional()
    street: string

    @IsString()
    @IsOptional()
    house_number: string

    @IsInt()
    district_id: number
}