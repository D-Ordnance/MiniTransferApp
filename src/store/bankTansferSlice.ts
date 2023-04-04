import { createSlice } from "@reduxjs/toolkit";
import BankTransferStore from "./bankTransferStore";
import { checkAccountFieldValidity, getBanks, makeTransferService, confirmTransferService ,retryTransferService } from "../service/tansfer";
import { saveItem, update, getItem } from '../util/storage'
import { BALANCE, TRANSFER } from "../util/constant";


const initialState = BankTransferStore

const bankTransferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers:{
        getBankList: (state, {payload}) => {
            if(payload.isSuccess){
                state.enableBankDropDown = true
                state.banks = payload.banks
            }else{
                state.enableBankDropDown = false
                state.message = payload.message
            }
        },
        verifyBankAccount: (state, {payload}) => {
            if(payload.isValid){
                state.enableTransferButton = true
            }else{
                state.enableTransferButton = false
            }
            state.accountIsValid = payload.isValid
            state.message = payload.message
        },
        makeTransfer: (state, {payload}) => {
            if(payload.successful){
                state.balance = state.balance - payload.amountCharged
            }else{
                state.success = payload.successful
                state.message = payload.message
            }
        },
        toggleShowMessageState: (state, {payload}) => {
            state.showMessage = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getBanks.pending, (state) => {
            state.bankListIsLoading = true
        })
        builder.addCase(getBanks.fulfilled, (state, { payload }) => {
            state.bankListIsLoading = false
            const arr = payload.data
            state.banks = arr
            
        })
        builder.addCase(getBanks.rejected, (state, { payload }) => {
            state.bankListIsLoading = false
        })

        builder.addCase(checkAccountFieldValidity.pending, (state) => {
            state.accountIsValid = false
            state.enableTransferButton = false
        })
        builder.addCase(checkAccountFieldValidity.fulfilled, (state, { payload }) => {
            state.enableTransferButton = true
            if(payload.status == "success"){
                state.accountName = payload.data.account_name
            }else{
                state.showMessage = true
                state.message = payload.message
                state.accountName = ""
            }
        })
        builder.addCase(checkAccountFieldValidity.rejected, (state, { payload }) => {
            state.accountIsValid = false
            state.enableTransferButton = false
            state.showMessage = true
            state.message = "Something went wrong"
        })

        builder.addCase(makeTransferService.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(makeTransferService.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = payload.message
            if(payload.status == "success"){
                saveItem(TRANSFER, JSON.stringify(payload.data))
                if(payload.data.id !== undefined){
                    confirmTransferService(payload.data.id)
                }
            }
        })
        builder.addCase(makeTransferService.rejected, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = "Something went wrong"
        })

        builder.addCase(confirmTransferService.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(confirmTransferService.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = payload.message
            if(payload.status == "success"){
                update(TRANSFER, JSON.stringify(payload.data))
                state.balance = state.balance - payload.data.amount
                update(BALANCE, payload.data.amount)
            }
        })
        builder.addCase(confirmTransferService.rejected, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = "Something went wrong"
        })

        builder.addCase(retryTransferService.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(retryTransferService.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = payload.message
            if(payload.status == "success"){
                if(payload.data.id !== undefined){
                    confirmTransferService(payload.data.id)
                }   
            }
        })
        builder.addCase(retryTransferService.rejected, (state, { payload }) => {
            state.isLoading = false
            state.showMessage = true
            state.message = "Something went wrong"
        })
    }
})

export const {getBankList, verifyBankAccount, makeTransfer, toggleShowMessageState}  = bankTransferSlice.actions
export default bankTransferSlice.reducer

