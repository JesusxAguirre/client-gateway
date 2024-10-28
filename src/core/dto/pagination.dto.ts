import { Expose, Transform, Type } from "class-transformer";
import { IsOptional, IsPositive, ValidateNested } from "class-validator";

export class PaginationDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public page?: number = 1;

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public limit?: number = 10;
}

export class ResponsePaginationDto<T> {
    @IsPositive()

    public page: number;

    @IsPositive()
    public totalItems: number;

    @IsPositive()
    public totalPages: number;

    @Type(() => Object)
    public items: T[];

    constructor(partial: Partial<ResponsePaginationDto<T>>) {
        Object.assign(this, partial);
    }
}
