export interface Defect {
    area: string;
    band: string;
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
