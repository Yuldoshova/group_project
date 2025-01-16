import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./model/review.model";
import { ReviewService } from "./review.service";

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";


@ApiTags('review')

@Controller('review')
export class ReviewController {
    constructor(private readonly service: ReviewService) { }
    @Post()
    @ApiOperation({ summary: 'Create a new review' })
    @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    create(@Body() reviewData: CreateReviewDto) {
        return this.service.createReview(reviewData)
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all reviews' })
    @ApiResponse({ status: 200, description: 'List of all reviews retrieved successfully.' })
    getAll() {
        return this.service.getAllReviews()
    }
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a single review by ID' })
    @ApiResponse({ status: 200, description: 'The review has been retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    getOne(@Param('id') id: number): Promise<Review> {
        return this.service.getReviewById(id)


    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update a review by ID' })
    @ApiResponse({ status: 200, description: 'The review has been updated successfully.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    update(@Param('id') id: number, @Body() data: UpdateReviewDto) {
        return this.service.updateReview(id, data)
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a review by ID' })
    @ApiResponse({ status: 200, description: 'The review has been deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    delete(@Param('id') id: number) {
        return this.service.deleteReview(id)

    }

}