import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/card-create.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Card")
@Controller({ version: "1", path: "card" })
export class Cardcontroller {
    constructor(private readonly service: CardService) { }
    @Get()
    getAll() {
        return this.service.getAll()
    }
    @Post()
    create(@Body() cardData: CreateCardDto) {
        return this.service.create(cardData)
    }
    @Put('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() cardData: UpdateCardDto) {
        return this.service.update(id, cardData);
    }
    @Delete(':id')
    delete(@Param('id',ParseIntPipe)id: number){
        return this.service.delete(id)

    }
    
}