
export class PageData {

	totalItemCount: number;
	totalPageCount: number;

	pageNumber: number;
    pageLength: number;

	constructor(){
		this.pageNumber = 1; // Defaut value
		this.pageLength = 10; // Defaut value
	}
	// filterData: any;
	// sortData: any;
}