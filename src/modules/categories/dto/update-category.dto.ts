import { ApiSchema, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto.ts.js';

@ApiSchema({ name: 'UpdateCategoryRequest' })
export class UpdateCategory extends PartialType(CreateCategoryDto) {}
