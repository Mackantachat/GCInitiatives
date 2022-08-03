export interface CompanyList {
    id: string,
    name: string,
    value: string,
    org: Org[],
    plant: Plant[]
}

export interface Org {
    id: string,
    name: string
}

export interface Plant {
    id: string,
    name: string
}