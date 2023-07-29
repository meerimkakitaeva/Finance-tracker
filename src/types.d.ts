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

export interface ICategoriesList {
    [id: string]: ICategoryMutation;
}

export interface ITransactionItem {
    category: string;
    amount: number;
    createdAt: string;
}

export interface ITransaction {
    type: string;
    name: string;
    amount: number;
    createdAt: string
}

export interface ITransactionApi {
    id: string;
    type: string;
    name: string;
    amount: number;
    createdAt: string
}

export interface ITransactionList {
    [id: string] : ITransactionItem;
}

export interface ITransactionMutation {
    type: string;
    name: string;
    amount: number;
    createdAt: string
}


