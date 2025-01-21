import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cards')
export class Card{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"int"})
    user_id: number

}