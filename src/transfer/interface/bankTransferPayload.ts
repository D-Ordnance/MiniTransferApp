export interface BankTransferPayload {
    account_bank: string;
    account_number: string;
    amount: number;
    currency: string;
    debit_currency: string;
}

export interface StateBalanceModel{
    successful: boolean
    amountCharged: number,
}