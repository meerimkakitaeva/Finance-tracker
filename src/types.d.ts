export interface ICategory {
    id: string;
    name: string;
    type: string;
}

export type TApiCategory = Omit<ICategory, 'id'>;

export interface ICategoryMutation {
    name: string;
    type: string;
}