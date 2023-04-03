import { bankType } from "./bankType";

export type BankTransferStateType = {
    balance: number,
    bankListIsLoading: boolean;
    banks: bankType[];

    enableBankDropDown: boolean;
    accountIsValid: boolean;
    accountName: string;
    enableTransferButton: boolean;

    transferResponse: TransferResponse[];

    message: string;
    success: boolean;

    showMessage: boolean,

    amountIsValid: boolean;
    isLoading: boolean;
}

export type bankAccount = {
    account_number: string,
    account_bank: string
}

export type makeTransferModel = {
    account_bank: string,
    account_number: string,
    amount: number,
    narration: string,
    currency: string,
    reference: string,
    callback_url?: string,
    debit_currency: string
}

export type retryTransferModel = {
    id: number,
}

export type networkBankTrasferResponse<T> = {
    success: string;
    message: string;
    data: T
}

export type TransferResponse = {
    id: number;
    account_number: string;
    bank_code: string;
    full_name: string;
    created_at: string;
    currency: string;
    debit_currency: string;
    amount: number;
    fee: number;
    status: string;
    reference: string;
    meta: string;
    narration: string;
    complete_message: string;
    requires_approval: number;
    is_approved: number;
    bank_name: string;
}