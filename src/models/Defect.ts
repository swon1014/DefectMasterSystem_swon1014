export interface Defect {
    fab: string;
    area: string;
    band: string;
    process: string;
    chamber: string;
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
