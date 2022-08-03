export interface IRole {
    id:number;
    roleId: string;
    roleName: string;
    description: string;
    isActive: boolean;
}

export interface IRoleListManage {
    Id:number;
    RoleID: string;
    RoleName: string;
    ScreenObjectID: string;
    ActionID: string[];
    Active: boolean;
}

export interface IAction {
    actionId: string;
    actionName: string;
}

export interface IScreenObject {
    screenObjectId: string;
    screenObjectName: string;
    type: string;
}

export interface PermissionMaster {
    permissionMasterId: string;
    permissionName: string;
    description: string;
}

export interface IRoleDetail {
    id: number;
    roleId: string;
    roleName: string;
    description: string;
    isActive: boolean;
    rolePermissionModel: IRoleDetailGroupItem[];
}

export interface IRoleDetailGroupItem {
    // screenObject: string;
    // action: string[];
    roleId: number;
    permissionMasterId:number;
}

export interface IPosition {
    id: number;
    positionID: string;
    positionLevel: string;
    positionShortTextEN: string;
    positionTextEN: string;
}

export interface IBU {
    id: number;
    buid: string;
    buText: string;
}

export interface IWorkStream {
    id: number;
    workstreamID: string;
    workstreamTitle: string;
}