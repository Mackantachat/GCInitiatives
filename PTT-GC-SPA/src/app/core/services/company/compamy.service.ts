import { Injectable } from '@angular/core';
import { CompanyList } from '@models/companyList';

@Injectable({
  providedIn: 'root'
})
export class CompamyService {

  companyList: CompanyList[] = [
    {
      id: '10', name: "10-PTTGC", value: "PTTGC",
      org: [
        { id: '1', name: 'CEO' },
        { id: '2', name: 'PSD' },
        { id: '3', name: 'COE' },
        { id: '4', name: 'SEVP-U' },
        { id: '5', name: 'SEVP-D' },
        { id: '6', name: 'REF' },
        { id: '7', name: 'ARO' },
        { id: '8', name: 'OLE' },
        { id: '9', name: 'POL' },
        { id: '10', name: 'UTY' },
        { id: '11', name: 'PHN' },
        { id: '12', name: 'EOB' },
        { id: '13', name: 'GRN' },
        { id: '14', name: 'DSB' },
        { id: '15', name: 'BIA' },
        { id: '16', name: 'CSL' },
        { id: '17', name: 'FNA' },
        { id: '18', name: 'HOE' },
        { id: '19', name: 'IBO' },
        { id: '20', name: 'ISI' },
        { id: '21', name: 'MCS' },
        { id: '22', name: 'PMT' },
        { id: '23', name: 'QSE' },
        { id: '24', name: 'SCB' },
        { id: '25', name: 'STG' },
        { id: '26', name: 'TEM' },
        { id: '27', name: 'TFE' },
        { id: '28', name: 'TPX' },
        { id: '29', name: 'CBR' }
      ],
      plant: [
        { id: '1011', name: '1011 - REFINERY - R-P1' },
        { id: '1021', name: '1021 - AROMATICS I - A-P1' },
        { id: '1022', name: '1022 - AROMATICS II - A-P2' },
        { id: '1031', name: '1031 - I-1 OLEFINS PLANT - O-P1.1' },
        { id: '1032', name: '1032 - I-1 OLEFLEX PLANT - O-P1.2' },
        { id: '1033', name: '1033 - I-1 UTILITY PLANT - U-P1' },
        { id: '1034', name: '1034 - I-4/1 OLEFINS PLANT - O-P2.1' },
        { id: '1035', name: '1035 - I-4/2 OLEFINS PLANT - O-P2.2' },
        { id: '1036', name: '1036 - BV PLANT (I-4) - O-P2.3' },
        { id: '1037', name: '1037 - OLEFINS(PTTPE) PLANT - O-P3' },
        { id: '1041', name: '1041 - HDPE (BPE1) PLANT - P-HD1.1' },
        { id: '1042', name: '1042 - HDPE (BPE2) PLANT - P-HD1.2' },
        { id: '1043', name: '1043 - HDPE (I-1) PLANT - P-HD2' },
        { id: '1044', name: '1044 - LDPE PLANT - P-LD' },
        { id: '1045', name: '1045 - LLDPE 1 PLANT - P-LL1.1' },
        { id: '100A', name: '100A - GENERAL WAREHOUSE I-1 - T-TA' },
        { id: '100B', name: '100B - GENERAL WAREHOUSE I-4 - T-TA' },
        { id: '100C', name: '100C - GENERAL WAREHOUSE ARO1 - T-TA' },
        { id: '100D', name: '100D - GENERAL WAREHOUSE ARO2 - T-TA' },
        { id: '100E', name: '100E - GENERAL WAREHOUSE REFINERY - T-TA' },
        { id: '100F', name: '100F - GENERAL WAREHOUSE PTTPE - T-TA' },
        { id: '100G', name: '100G - GENERAL WAREHOUSE BPE - T-TA' },
        { id: '100Z', name: '100Z - LAB SERVICE CENTER' },
        { id: '101A', name: '101A - REFINERY MOVEMENT - R-RM' },
        { id: '101X', name: '101X - IN-TRANSIT REFINERY' },
        { id: '101Y', name: '101Y - EXTERNAL REFINERY' },
        { id: '102X', name: '102X - IN-TRANSIT AROMATICS' },
        { id: '102Y', name: '102Y - EXTERNAL AROMATICS' },
        { id: '103X', name: '103X - IN-TRANSIT OLEFINS' },
        { id: '103Y', name: '103Y - EXTERNAL OLEFINS' },
        { id: '104X', name: '104X - POLYMER AGENT PLANT' },
        { id: '10ZA', name: '10ZA - RAYONG OFFICE (RO)' },
        { id: '10ZB', name: '10ZB - UTILITY BUILDING(RO)' },
        { id: '10ZC', name: '10ZC - LAB INNOVATION' },
        { id: '10ZD', name: '10ZD - ADMIN SERVICE' },
        { id: '10ZN', name: '10ZN - HEAD OFFICE (ENCO)' },
        { id: '1046', name: '1046 - LLDPE 2 PLANT - P-LL1.2' },
        { id: '1019', name: '1019 - CHEMICAL MOVEMENT - U-CM' },
        { id: '1038', name: '1038 - ORP OLEFINS PLANT - O-P4' }
      ]
    },
    {
      id: '11', name: "11-Glycol", value: "Glycol",
      org: [
        { id: '1', name: 'EOB' }
      ],
      plant: [
        { id: '1151', name: '1151 - GC GLYCOL PLANT - E-GC1.1' },
        { id: '1152', name: '1152 - GC GLYCOL EA PLANT - E-GC1.2' },
        { id: '110A', name: '110A - GENERAL WAREHOUSE TOCGC - T-TA' }

      ]
    },
    {
      id: '13', name: "13-SUN", value: "SUN",
      org: [
        { id: '1', name: 'SEVP-D' }
      ],
      plant: [
        { id: '1381', name: '1381 - SOLUTION CREATION PLANT' }

      ]
    },
    {
      id: '15', name: "15-GGC", value: "GGC",
      org: [
        { id: '1', name: 'GRN' }
      ],
      plant: [
        { id: '1561', name: '1561 - GGC PLANT - G-OL1.1' },
        { id: '150A', name: '150A - GENERAL WAREHOUSE GGC' },
        { id: '15ZN', name: '15ZN - GGC MPR ASSET' },

        { id: '1563', name: '1563 - GGC MEII PLANT - G-OL2' },
        { id: '1563', name: '1563 - GGC MEII PLANT - GL2' },
        { id: '1563', name: '1563 - GGC MEII PLANT - FA2' },
        { id: '150B', name: '150B - GGC GENERAL PLANT' }
      ]
    },
    {
      id: '16', name: "16-TFA", value: "TFA",
      org: [
        { id: '1', name: 'GRN' }
      ],
      plant: [
        { id: '1661', name: '1661 - TFA PLANT - G-OL1.2' },
        { id: '160A', name: '160A - GENERAL WAREHOUSE TFA' }


      ]
    },
    {
      id: '19', name: "19-NPC S&E", value: "NPC S&E",
      org: [
        { id: '1', name: 'COE' }
      ],
      plant: [
        { id: '1981', name: '1981 - NPC S&E' }
      ]
    },
    {
      id: '20', name: "20-GCME", value: "GCME",
      org: [
        { id: '1', name: 'COE' }
      ],
      plant: [
        { id: '2081', name: '2081 - GCME' }
      ]
    },
    {
      id: '21', name: "21-GCS", value: "GCS",
      org: [
        { id: '1', name: 'POL' }
      ],
      plant: [
        { id: '2141', name: '2141 - GCS PRODUCTION PLANT - P-PS' },
        { id: '210A', name: '210A - GENERAL WAREHOUSE TSCL - T-TA' },
        { id: '214X', name: '214X - GCS AGENT PLANT' }
      ]
    },
    {
      id: '28', name: "28-Vencorex (Thailand)", value: "Vencorex",
      org: [
        { id: '1', name: 'IBO' }
      ],
      plant: [
        { id: '280A', name: '280A - VCR GENERAL PLANT' },
        { id: '2871', name: '2871 - VCR PLANT' }
      ]
    },
    {
      id: '29', name: "29-PPCL", value: "PPCL",
      org: [
        { id: '1', name: 'PHN' }
      ],
      plant: [
        { id: '2991', name: '2991 - PHENOL I - PH-P1.1' },
        { id: '2992', name: '2992 - PHENOL II - PH-P1.2' },
        { id: '2993', name: '2993 - BPA - PH-P2' },
        { id: '290A', name: '290A - GENERAL WAREHOUSE PPCL - T-TA' }
      ]
    },
    {
      id: '31', name: "31-GCO", value: "GCO",
      org: [
        { id: '1', name: 'DSB' }
      ],
      plant: [
        { id: '3171', name: '3171 - GCO PLANT - GCO' },
        { id: '310A', name: '310A - GENERAL WAREHOUSE GCO - T-TA' }
      ]
    },
    {
      id: '32', name: "32-GCP", value: "GCP",
      org: [
        { id: '1', name: 'DSB' }
      ],
      plant: [
        { id: '3271', name: '3271 - GCP PLANT - GCP' },
        { id: '320A', name: '320A - GENERAL WAREHOUSE GCP - T-TA' }
      ]
    },
    {
      id: '36', name: "36-GCMPTA", value: "GCMPTA",
      org: [
        { id: '1', name: 'POL' }
      ],
      plant: [
        { id: '360A', name: '360A - GC-M PTA GENERAL PLANT' },
        { id: '3641', name: '3641 - GC-M PTA 1 PLANT' },
        { id: '3642', name: '3642 - GC-M PTA 2 PLANT' },
        { id: '3643', name: '3643 - GC-M PTA 3 PLANT' }
      ]
    },
    {
      id: '37', name: "37-TPRC", value: "TPRC",
      org: [
        { id: '1', name: 'POL' }
      ],
      plant: [
        { id: '370A', name: '370A - TPRC GENERAL PLANT' },
        { id: '3741', name: '3741 - TPRC PLANT' }
      ]
    },
    {
      id: '38', name: "Others", value: "Others",
      org: [
        {
          id: "1",
          name: "CEO"
        },
        {
          id: "2",
          name: "PSD"
        },
        {
          id: "3",
          name: "COE"
        },
        {
          id: "4",
          name: "SEVP-U"
        },
        {
          id: "5",
          name: "SEVP-D"
        },
        {
          id: "6",
          name: "REF"
        },
        {
          id: "7",
          name: "ARO"
        },
        {
          id: "8",
          name: "OLE"
        },
        {
          id: "9",
          name: "POL"
        },
        {
          id: "10",
          name: "UTY"
        },
        {
          id: "11",
          name: "PHN"
        },
        {
          id: "12",
          name: "EOB"
        },
        {
          id: "13",
          name: "GRN"
        },
        {
          id: "14",
          name: "DSB"
        },
        {
          id: "15",
          name: "BIA"
        },
        {
          id: "16",
          name: "CSL"
        },
        {
          id: "17",
          name: "FNA"
        },
        {
          id: "18",
          name: "HOE"
        },
        {
          id: "19",
          name: "IBO"
        },
        {
          id: "20",
          name: "ISI"
        },
        {
          id: "21",
          name: "MCS"
        },
        {
          id: "22",
          name: "PMT"
        },
        {
          id: "23",
          name: "QSE"
        },
        {
          id: "24",
          name: "SCB"
        },
        {
          id: "25",
          name: "STG"
        },
        {
          id: "26",
          name: "TEM"
        },
        {
          id: "27",
          name: "TFE"
        },
        {
          id: "28",
          name: "TPX"
        },
        {
          id: "29",
          name: "EOB"
        },
        {
          id: "30",
          name: "SEVP-D"
        },
        {
          id: "31",
          name: "GRN"
        },
        {
          id: "32",
          name: "COE"
        },
        // {
        //   id: "33",
        //   name: "POL"
        // },
        {
          id: "34",
          name: "IBO"
        },
        {
          id: "35",
          name: "PHN"
        },
        {
          id: "36",
          name: "DSB"
        }
      ],
      plant: [
        { id: '10ZN', name: '10ZN - HEAD OFFICE (ENCO)' },
        { id: '10ZA', name: '10ZA - RAYONG OFFICE (RO)' }
      ]
    }
    // ,
    // {
    //   id: '99', name: "PTT-FRZ", value: "PTT-FRZ",
    //   org: [
    //     { id: '1', name: 'SEVP-D' }
    //   ],
    //   plant: [
    //     { id: '370A', name: '370A - TPRC GENERAL PLANT' },
    //     { id: '3741', name: '3741 - TPRC PLANT' }
    //   ]
    // }
  ]

  defaultToDirectCapex = [
    '36',
    '37'
  ]

  constructor() { }
}
