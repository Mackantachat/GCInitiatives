import { Pagination } from './pagination';
import { CustomReportHeader } from './customReportHeader';

export interface CustomReportHeaderPagination {
    allReportHeader :CustomReportHeader[];
    paginationHeader: Pagination;
}