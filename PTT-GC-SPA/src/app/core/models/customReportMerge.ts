import { CustomReportHeader } from './customReportHeader';
import { CustomReportDetail } from './customReportDetail';
import { CustomReportParam } from './customReportParam';

export interface CustomReportMerge {
    reportHeader: CustomReportHeader;
    reportDetailX: CustomReportDetail;
    reportDetailY: CustomReportDetail[];
    reportParam: CustomReportParam[];

}