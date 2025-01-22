import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./entities/address.entitiy";
import { Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService{
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>){}
    async create(addressData: CreateAddressDto):Promise<Address>{
        const newAddress = this.addressRepository.create(addressData)
        return await this.addressRepository.save(newAddress)
    }

    async getAll(){
        return await this.addressRepository.find()
    }

    async getOne(id: number):Promise<Address>{
        const address =  await this.addressRepository.findOne({where:{id}})
        return address
    }

    async update(addressData: UpdateAddressDto,id: number){
        const updatedData = await this.addressRepository.findOne({where:{id}})
        if(!updatedData){
            throw new NotFoundException("Not found")
        }
        Object.assign(updatedData,addressData)
        return await this.addressRepository.save(updatedData)
    }
    
    async delete(id: number){
        return await this.addressRepository.findOne({where:{id}})
    }
}