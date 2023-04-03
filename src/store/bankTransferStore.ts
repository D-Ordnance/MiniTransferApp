import {BankTransferStateType} from "../transfer/types/stateTypes"
import { BALANCE } from "../util/constant";
import { getItem, saveItem } from "../util/storage";

const BankTransferStore: BankTransferStateType = {
    balance: 1000000,
    bankListIsLoading: true,
    banks: [],

    enableBankDropDown: false,
    accountIsValid: false,
    accountName: "",
    enableTransferButton: false,

    transferResponse: [],

    message: "",
    success: true,

    showMessage: false,

    amountIsValid: true,
    isLoading: false,
};

export default BankTransferStore