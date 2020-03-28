export interface Defect {
    area: string;
    brand: string;
    process: string;
    type: string;
    style: string;
    map: string;
    actions: Action[];
}

export interface Action {
    Id: string;
    subject: string;
    content: string;
}
