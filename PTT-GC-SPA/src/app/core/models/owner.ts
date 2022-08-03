// import { DropdownBu } from './owner';
export interface Owner {
  ownerName: string;
  email: string;
  telephone: string;
}


export class OwnerModel {
  constructor() { }

  public id: number;
  public ownerName: string;
  public employeeID: string;
  public firstName: string;
  public lastName: string;
  public indicator: string;
  public telephone: string;
  public email: string;
  public title: string;
  public bloodGrp: string;
  public extension: string;
  public companyCode: number;
  public companyShortTxt: string;
  public companyName: string;
  public empGroup: string;
  public empGroupTxt: string;
  public empSubGroup: number;
  public empSubGroupTxt: string;
  public employmentStatus: number;
  public employmentStatusTxt: string;
  public adminGroup: string;
  public mainPositionCostCenter: number;
  public assignmentCostCenter: number;
  public actionType: string;
  public actionText: string;
  public orgID: number;
  public orgTextEN: string;
  public orgShortTextEN: string;
  public orgLevel: number;
  public positionID: number;
  public positionTextEN: string;
  public positionShortTextEN: string;
  public positionLevel: number;
  public managerialFlag: boolean;
  public mainPositionFlg: boolean;
  public parentOrgID: number;
  public unitOrgID: number;
  public unitShortTextEN: string;
  public unitTextEN: string;
  public unitManagerPositionID: number;
  public unitManagerEmpID: number;
  public supOrgID: number;
  public supShortTextEN: string;
  public supTextEN: string;
  public supManagerPositionID: number;
  public supManagerEmpID: number;
  public shiftOrgID: number;
  public shiftShortTextEN: string;
  public shiftTextEN: string;
  public shiftManagerPositionID: number;
  public shiftManagerEmpID: number;
  public divOrgID: number;
  public divShortTextEN: string;
  public divTextEN: string;
  public divManagerPositionID: number;
  public divManagerEmpID: number;
  public depOrgID: number;
  public depShortTextEN: string;
  public depTextEN: string;
  public depManagerPositionID: number;
  public depManagerEmpID: number;
  public fNOrgID: number;
  public fNShortTextEN: string;
  public fNTextEN: string;
  public fNManagerPositionID: number;
  public fNManagerEmpID: number;
  public fNGRPOrgID: number;
  public fNGRPShortTextEN: string;
  public fNGRPTextEN: string;
  public fNGRPManagerPositionID: number;
  public fNGRPManagerEmpID: number;
  public pSDOrgID: number;
  public pSDShortTextEN: string;
  public pSDTextEN: string;
  public pSDManagerPositionID: number;
  public pSDManagerEmpID: number;
  public cEOOrgID: number;
  public cEOShortTextEN: string;
  public cEOTextEN: string;
  public cEOManagerPositionID: number;
  public cEOManagerEmpID: number;
  public dataSource: string;
}

export interface IOwner {
  userManagementID: string;
  employeeID: string;
  ownerName: string;
  firstName: string;
  lastName: string;
  email: string;
  positionID: string;
  positionLevel: string;
  positionShortTextEN: string;
  positionTextEN: string;
  buID: string;
  buText: string;
  workstreamID: string;
  workstreamTitle: string;
  roleId: string;
  roleName: string;
  createOn: string;
  remark: string;
  active: boolean;
}

export interface IOwnerInitiative {
  employeeID: string;
  firstName: string;
  lastName: string;
  positionID: string;
  email: string;
  buid: string;
  workstreamID: string;
  roleID: string[];
  remark: string;
  dropdownBu: DropdownBu[];
  dropdownPosition: DropdownPosition[];
  dropdownWorkstream: DropdownWorkstream[];
}

export interface DropdownBu {
  value: string;
  text: string;
}

export interface DropdownPosition {
  value: string;
  text: string;
}

export interface DropdownWorkstream {
  value: string;
  text: string;
}

export interface OwnerList {
  ownerName: string;
  employeeID: string;
  firstName: string;
  lastName: string;
  indicator: string;
  telephone: string;
  email: string;
}