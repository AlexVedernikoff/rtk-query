interface UserInfo {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
}

export interface MedicineRequest {
    manufactureName: string;
    name: string;
    iconUrl: string;
    description: string;
}

export interface MedicineResponse {
    id?: number;
    manufactureName?: string;
    name?: string;
    iconUrl?: string;
    description?: string;
    creationDateTime?: Date;
    lastUpdateDateTime?: Date;
    createAuthor?: UserInfo;
    lastUpdateAuthor?: UserInfo;
}