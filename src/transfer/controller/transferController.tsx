import { useDispatch } from "react-redux";
import { makeTransfer, toggleShowMessageState } from "../../store/bankTansferSlice";
import useTransferViewModel from "../view_model/transferViewModel";
import { StateBalanceModel } from "../interface/bankTransferPayload";
import { useEffect, useState } from "react";
import { checkAccountFieldValidity, getBanks, makeTransferService } from "../../service/tansfer";
import { AppDispatch } from "../../store";
import { bankAccount, makeTransferModel } from "../types/stateTypes";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";


const useTransferController = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>()
    const {
        balance,
        banks,
        bankListIsLoading,
        accountIsValid,
        accountName,
        enableTransferButton,
        isLoading,
        message,
        success,
        showMessage,
    } = useTransferViewModel();
    

    
    const [bankCode, setBankCode] = useState(null)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [accountFieldIsValid, setAccountFieldIsValid] = useState<boolean>(false)
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [amountIsValid, setAmountIsValid] = useState<boolean>(false)
    
    const onChangeText = (text: string) => {
        if(bankCode && text.length == 10){
            setAccountFieldIsValid(true)
            checkAccountValidity(bankCode, text)
        }else{
            setAccountFieldIsValid(false)
        }
        setAccountNumber(text);
    };

    useEffect( ()=> {
        getBankList()
    }, []);

    const getBankList = () => {
        dispatch(getBanks())
    }

    const onFocus = () => {
        setIsFocus(true)
    }

    const onBlur = () => {
        setIsFocus(false)
    }

    const onChange = (item: any) => {
        setIsFocus(false)
        setBankCode(item.value)
        if(item.value && accountNumber.length == 10){
            setAccountFieldIsValid(true)
            checkAccountValidity(item.value, accountNumber)
        }else{
            setAccountFieldIsValid(false)
        }
        
    }

    const checkAccountValidity = (account_bank: string, account_number: string) => {
        const obj: bankAccount = {account_number: account_number, account_bank: account_bank}
        
        dispatch(checkAccountFieldValidity(obj))
    }

    const onAmountChanged = (amount: string) => {
        if(amount < "100" || amount > "10000000"){
            setAmountIsValid(false)
        }
        setAmountIsValid(true)
        setAmount(parseInt(amount))
    }

    const getCurrentdate = () => {
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const milli = new Date().getMilliseconds();
        return 'Reference-' + date+year+milli
    }

    const makeTransfer = () => {
        if(!enableTransferButton){
            Toast.show('Enter a valid bank account', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        if(!amountIsValid){
            Toast.show('Amount should not be less than 100 or greater than 10,000,000', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }

        const model: makeTransferModel = {
            account_bank: bankCode,
            account_number: accountNumber,
            amount: amount,
            narration: "This amount " + amount + " was initiated to " + accountNumber,
            currency: "NGN",
            reference: getCurrentdate(),
            debit_currency: "NGN",
        }
        
        dispatch(makeTransferService(model))
    }
    const toggleShowMessage = () => {
        dispatch(toggleShowMessageState(false))
    }

    const viewAllTransferHistory = () => {
        navigation.navigate("History", "")
    }


    return {
        banks,
        accountIsValid,

        getBankList,
        checkAccountValidity,
        makeTransfer,

        balance,

        onFocus,
        onBlur,
        bankCode,
        isFocus,
        onChange,
        onChangeText,
        accountFieldIsValid,
        accountNumber,
        accountName,
        enableTransferButton,
        onAmountChanged,

        isLoading,

        showMessage,
        message,
        toggleShowMessage,

        viewAllTransferHistory,
    }
};

export default useTransferController;