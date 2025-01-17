import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { Address } from "./entities/address.entitiy";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller({ version: "1", path: "address" })
export class AddressController {
    constructor(private readonly service: AddressService) { }
    @Post()
    create(@Body() addressData: CreateAddressDto): Promise<Address> {
        return this.service.create(addressData)

    }
    @Get()
    getAll() {
        return this.service.getAll()
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Address> {
        return this.service.getOne(id)
    }

    @Put('update/:id')
     update(
        @Param('id', ParseIntPipe) id: number,
        @Body() addressData: UpdateAddressDto,
    ): Promise<Address> {
        return this.service.update(addressData, id);
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe)id: number){
        return this.service.delete(id)
    }
}