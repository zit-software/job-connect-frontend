export interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

export interface Pagable {
	sort: Sort;
	offset: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

export type Paginationable<ContentType> = {
	content: ContentType[];
	pageable: Pagable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	sort: Sort;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
};
