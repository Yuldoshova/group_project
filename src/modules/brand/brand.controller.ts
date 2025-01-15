import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { CreateBrandDto, UpdateBrandDto } from "./dto/brand.dto";

@Controller('brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    create(@Body() CreateBrandDto: CreateBrandDto){
        return this.brandService.create(CreateBrandDto);
    }

    @Get()
    findAll(){
        return this.brandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.brandService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() UpdateBrandDto: UpdateBrandDto){
        return this.brandService.update(+id, UpdateBrandDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.brandService.remove(+id);
    }

}




