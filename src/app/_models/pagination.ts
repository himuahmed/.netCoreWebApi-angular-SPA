export interface Pagination {
    totalCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
}
export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
