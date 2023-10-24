export interface Sort {
	/**
	 * @description If empty
	 */
	empty: boolean;

	/**
	 * @description If unsorted
	 */
	unsorted: boolean;

	/**
	 * @description If sorted
	 */
	sorted: boolean;
}

export interface Pagable {
	/**
	 * @description Sort object
	 */
	sort: Sort;

	/**
	 * @description Offset of elements
	 */
	offset: number;

	/**
	 * @description Current page number (start from 0)
	 */
	pageNumber: number;

	/**
	 * @description Elements of page
	 */
	pageSize: number;

	/**
	 * @description If paged
	 */
	paged: boolean;

	/**
	 * @description If unpaged
	 */
	unpaged: boolean;
}

export type Paginationable<ContentType> = {
	/**
	 * @description Elements of @type {ContentType}
	 */
	content: ContentType[];

	/**
	 * @description Pagable object
	 */
	pageable: Pagable;

	/**
	 * @description Total pages
	 */
	totalPages: number;

	/**
	 * @description Total element in system
	 */
	totalElements: number;

	/**
	 * @description If current page is last
	 */
	last: boolean;

	/**
	 * @description Size of page
	 */
	size: number;

	/**
	 * @description Current page (start from 0)
	 */
	number: number;

	/**
	 * @description Sort object
	 */
	sort: Sort;

	/**
	 * @description If current page is first page
	 */
	first: boolean;

	/**
	 * @description Number of elements in current page
	 */
	numberOfElements: number;

	/**
	 * @description If page is empty
	 */
	empty: boolean;
};
