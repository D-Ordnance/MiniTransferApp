import { useDispatch, useSelector } from "react-redux";
import { StateBalanceModel } from "../interface/bankTransferPayload";
import { makeTransfer } from "../../store/bankTansferSlice";
import { BankTransferStateType } from "../types/stateTypes";





const useTransferViewModel = () => {

    const dispatch = useDispatch();

    // match props to state so as to get the value of state 
    // whenever it is updated
    // to do that you use the useSelector hook
    // we can destructure the model or type

    const {
        balance,
        bankListIsLoading,
        banks,
        accountIsValid,
        accountName,
        enableTransferButton,
        isLoading,
        message,
        amountIsValid,
        success,
        showMessage,
        transferResponse,
    }: BankTransferStateType = useSelector((state)=> (state as any).transfer)

    return{
        balance,
        bankListIsLoading,
        banks,
        accountIsValid,
        accountName,
        enableTransferButton,
        
        isLoading,
        message,
        amountIsValid,
        success,
        showMessage,

        transferResponse
    }
};


export default useTransferViewModel