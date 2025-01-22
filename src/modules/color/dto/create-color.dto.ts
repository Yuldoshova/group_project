import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateColorDto {

    @ApiProperty({
        type:'string', 
        required:true,
        default:"#7A007A"
    })
    @IsString()
    @IsNotEmpty()
    code: string

    @ApiProperty({
        type:'string', 
        required:true,
        default:"purple"
    })
    @IsString()
    @IsNotEmpty()
    name: string

}
