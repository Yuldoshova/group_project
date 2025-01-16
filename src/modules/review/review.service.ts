import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./model/review.model";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";  

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepository: Repository<Review>
    ) { }

    async createReview(reviewData: CreateReviewDto) {
        const review = this.reviewRepository.create(reviewData);
        return await this.reviewRepository.save(review);
    }

    async getAllReviews() {
        return await this.reviewRepository.find();
    }

    async getReviewById(id: number) {
        return await this.reviewRepository.findOne({ where: { id } });
    }

    async updateReview(id: number, reviewData: UpdateReviewDto) {
        // bu 1-usuli ekan update qilishni ---------------

        const review = await this.reviewRepository.findOne({where:{id}});
        if (!review) {
          return "Not found";
        }

        Object.assign(review, reviewData);
        return await this.reviewRepository.save(review);



        // bunisi 2-usul ---------------
        // const updatedReview = await this.reviewRepository
        //     .createQueryBuilder()
        //     .update()
        //     .set({
        //         comment: reviewData.comment,
        //         product_id: reviewData.product_id,
        //         user_id: reviewData.user_id,
        //         value: reviewData.value
        //     })
        //     .where("id = :id", { id })
        //     .execute()

        //     if(updatedReview.affected ===  0){
        //         return "review topilmadi"
        //     }
        //     return await this.reviewRepository.findOne({where:{id}})


    }

    async deleteReview(id: number) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            return "Not found";
        }

        await this.reviewRepository.remove(review);
        return review;
    }
}
