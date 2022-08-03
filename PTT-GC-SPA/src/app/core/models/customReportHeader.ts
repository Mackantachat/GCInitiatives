export interface CustomReportHeader {
    reportID: number;
    reportCode: string;
    reportName: string;
    description: string;
    graphType: string;
    x_AxisLabel: string;
    y_AxisLabel: string;
    otherTypeLabel: string;
    createUser: string;
    createDate: Date;
    updateUser: string;
    updateDate: Date;
    stageType: Date;
    isAccumulate: boolean;
    systemReportType: string;
}