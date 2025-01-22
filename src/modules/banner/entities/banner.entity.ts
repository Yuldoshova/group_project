import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
   id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type_id: number;

  @Column({ nullable: true })
  image: string;
}
