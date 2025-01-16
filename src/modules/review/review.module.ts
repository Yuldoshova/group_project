import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./model/review.model";
import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Review])],
    providers:[ReviewService],
    controllers:[ReviewController]
})
export class ReviewModule{}