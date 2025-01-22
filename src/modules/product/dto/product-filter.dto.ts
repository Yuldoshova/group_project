export interface ProductFilterDto {
    category_id?: number;
    brand_id?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
    page?: number;
    limit?: number;
    sort?: "asc" | "desc";
}