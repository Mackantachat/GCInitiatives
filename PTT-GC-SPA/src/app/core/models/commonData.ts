export interface commonData {
  id: number;
  dataType: string;
  attribute01: string;
  attribute02: string;
  attribute03: string;
  attribute04: string;
  attribute05: string;
  attribute06: string;
  attribute07: string;
  attribute08: string;
  attribute09: string;
  attribute10: string;
  attribute11: string;
  attribute12: string;
  attribute13: string;
  attribute14: string;
  attribute15: string;
  attribute16: string;
  attribute17: string;
  attribute18: string;
  attribute19: string;
  attribute20: string;
}


export interface Currency {
  currencyName: string;
  currencyMillionName: string;
  currencyValue: string;
  fxRate: number;

}

export interface StdProjectDefParams {
  initiativeId: number;
  typeOfInvestment: string;
  budgetSource: string;
}

export interface StdProjectDefRes {
  name: string;
  value: string;
  typeOfInvestment: string;
  budgetSource: string;
  defaultValue: number;
}
