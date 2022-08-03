import { KpiKriData } from './kpiKriData';

export class KpiKriConfig {
    public static months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    // public static months = ['jan', 'feb', 'oct', 'nov', 'dec'];
    public static KPI_NAME = 'KPI Name';
    public static EXTERNAL_KRI = 'External KRI';
    public static EXECUTION_KRI = 'Execution KRI';
    public static LONG_TERM_TARGET = 'Long-term Target';

    public static mapName(type: string) {
        switch (type) {
            case 'kpi_name':
                return KpiKriConfig.KPI_NAME;
            case 'external_kri':
                return KpiKriConfig.EXTERNAL_KRI;
            case 'execution_kri':
                return KpiKriConfig.EXECUTION_KRI;
            case 'long_term_target':
                return KpiKriConfig.LONG_TERM_TARGET;
            default:
                return '';
        }
    }
}

export class KpiKriMockData {
    static raw: KpiKriData = {
        status: 'Draft',
        date: '2020-09-09',
        years: {
            2020: {
                information: {
                    jan: { progressDetail: 'progressDetail-jan', mitigation: 'mitigation-jan' },
                    feb: { progressDetail: 'progressDetail-feb', mitigation: 'mitigation-feb' },
                    mar: { progressDetail: 'progressDetail-mar', mitigation: 'mitigation-mar' },
                    apr: { progressDetail: 'progressDetail-apr', mitigation: 'mitigation-apr' },
                    may: { progressDetail: 'progressDetail-may', mitigation: 'mitigation-may' },
                    jun: { progressDetail: 'progressDetail-jun', mitigation: 'mitigation-jun' },
                    jul: { progressDetail: 'progressDetail-jul', mitigation: 'mitigation-jul' },
                    aug: { progressDetail: 'progressDetail-aug', mitigation: 'mitigation-aug' },
                    sep: { progressDetail: 'progressDetail-sep', mitigation: 'mitigation-sep' },
                    oct: { progressDetail: 'progressDetail-oct', mitigation: 'mitigation-oct' },
                    nov: { progressDetail: 'progressDetail-nov', mitigation: 'mitigation-nov' },
                    dec: { progressDetail: 'progressDetail-dec', mitigation: 'mitigation-dec' }
                },
                details: [
                    {
                        type: 'kpi_name',
                        status: true,
                        detail: [
                            {
                                name: 'KPI Name AAAA',
                                1: { text: '1 text', colour: 'red' },
                                2: { text: '2 text', colour: 'yellow' },
                                3: { text: '3 text', colour: 'green' },
                                4: { text: '4 text', colour: 'yellow' },
                                5: { text: '5 text', colour: 'green' },
                            }
                        ],
                        jan: { score: 4, colour: 'red' },
                        feb: { score: 5, colour: 'red' },
                        mar: { score: 4, colour: 'red' },
                        apr: { score: 5, colour: 'yellow' },
                        may: { score: 4, colour: 'red' },
                        jun: { score: 5, colour: 'red' },
                        jul: { score: 4, colour: 'red' },
                        aug: { score: 5, colour: 'red' },
                        sep: { score: 4, colour: 'red' },
                        oct: { score: 5, colour: 'red' },
                        nov: { score: 4, colour: 'red' },
                        dec: { score: 5, colour: 'red' },
                    },
                    {
                        type: 'external_kri',
                        status: true,
                        detail: [
                            {
                                name: 'External KRI A',
                                1: 'external target-1',
                                2: 'external target-2',
                                3: 'external target-3'
                            }
                        ],
                        jan: { score: 1, colour: 'yellow' },
                        feb: { score: 2, colour: 'red' },
                        mar: { score: 3, colour: 'red' },
                        apr: { score: 1, colour: 'red' },
                        may: { score: 2, colour: 'yellow' },
                        jun: { score: 3, colour: 'red' },
                        jul: { score: 1, colour: 'red' },
                        aug: { score: 2, colour: 'red' },
                        sep: { score: 3, colour: 'red' },
                        oct: { score: 1, colour: 'red' },
                        nov: { score: 2, colour: 'red' },
                        dec: { score: 3, colour: 'red' },
                    },
                    {
                        type: 'execution_kri',
                        status: true,
                        detail: [
                            {
                                name: 'Execution KRI A',
                                1: 'execution target-1',
                                2: 'execution target-2',
                                3: 'execution target-3'
                            }
                        ],
                        jan: { score: 2, colour: 'red' },
                        feb: { score: 3, colour: 'red' },
                        mar: { score: 1, colour: 'yellow' },
                        apr: { score: 2, colour: 'red' },
                        may: { score: 3, colour: 'red' },
                        jun: { score: 1, colour: 'red' },
                        jul: { score: 2, colour: 'red' },
                        aug: { score: 3, colour: 'red' },
                        sep: { score: 1, colour: 'red' },
                        oct: { score: 2, colour: 'red' },
                        nov: { score: 3, colour: 'red' },
                        dec: { score: 1, colour: 'red' },
                    },
                    {
                        type: 'execution_kri',
                        status: true,
                        detail: [
                            {
                                name: 'Execution KRI C',
                                1: 'execution target-1',
                                2: 'execution target-2',
                                3: 'execution target-3'
                            }
                        ],
                        // jan: {score: 2, colour: 'red'},
                        // feb: {score: 3, colour: 'red'},
                        // mar: {score: 1, colour: 'yellow'},
                        // apr: {score: 2, colour: 'red'},
                        // may: {score: 3, colour: 'red'},
                        jun: { score: 1, colour: 'red' },
                        jul: { score: 2, colour: 'yellow' },
                        aug: { score: 3, colour: 'green' },
                        sep: { score: 1, colour: 'red' },
                        oct: { score: 2, colour: 'red' },
                        nov: { score: 3, colour: 'green' },
                        dec: { score: 1, colour: 'red' },
                    }
                ]
            },
            2021: {
                information: {
                    jan: { progressDetail: 'progressDetail-jan 2', mitigation: 'mitigation-jan 2' },
                    feb: { progressDetail: 'progressDetail-feb 2', mitigation: 'mitigation-feb 2' },
                    mar: { progressDetail: 'progressDetail-mar 2', mitigation: 'mitigation-mar 2' },
                    apr: { progressDetail: 'progressDetail-apr 2', mitigation: 'mitigation-apr 2' },
                    may: { progressDetail: 'progressDetail-may 2', mitigation: 'mitigation-may 2' },
                    jun: { progressDetail: 'progressDetail-jun 2', mitigation: 'mitigation-jun 2' },
                    jul: { progressDetail: 'progressDetail-jul 2', mitigation: 'mitigation-jul 2' },
                    aug: { progressDetail: 'progressDetail-aug 2', mitigation: 'mitigation-aug 2' },
                    sep: { progressDetail: 'progressDetail-sep 2', mitigation: 'mitigation-sep 2' },
                    oct: { progressDetail: 'progressDetail-oct 2', mitigation: 'mitigation-oct 2' },
                    nov: { progressDetail: 'progressDetail-nov 2', mitigation: 'mitigation-nov 2' },
                    dec: { progressDetail: 'progressDetail-dec 2', mitigation: 'mitigation-dec 2' }
                },
                details: []
            },
            2022: {
                information: {
                    jan: { progressDetail: 'progressDetail-jan 2', mitigation: 'mitigation-jan 2' },
                    feb: { progressDetail: 'progressDetail-feb 2', mitigation: 'mitigation-feb 2' },
                    mar: { progressDetail: 'progressDetail-mar 2', mitigation: 'mitigation-mar 2' },
                    apr: { progressDetail: 'progressDetail-apr 2', mitigation: 'mitigation-apr 2' },
                    may: { progressDetail: 'progressDetail-may 2', mitigation: 'mitigation-may 2' },
                    jun: { progressDetail: 'progressDetail-jun 2', mitigation: 'mitigation-jun 2' },
                    jul: { progressDetail: 'progressDetail-jul 2', mitigation: 'mitigation-jul 2' },
                    aug: { progressDetail: 'progressDetail-aug 2', mitigation: 'mitigation-aug 2' },
                    sep: { progressDetail: 'progressDetail-sep 2', mitigation: 'mitigation-sep 2' },
                    oct: { progressDetail: 'progressDetail-oct 2', mitigation: 'mitigation-oct 2' },
                    nov: { progressDetail: 'progressDetail-nov 2', mitigation: 'mitigation-nov 2' },
                    dec: { progressDetail: 'progressDetail-dec 2', mitigation: 'mitigation-dec 2' }
                },
                details: []
            }
        }
    };

    public static getData(): KpiKriData {
        return KpiKriMockData.raw;
    }
}
