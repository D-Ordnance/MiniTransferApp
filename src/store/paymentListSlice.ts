import { createSlice } from "@reduxjs/toolkit";
import BankTransferStore from "./bankTransferStore";


const initialState = BankTransferStore

const paymentListSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers:{
        confirmPayment: (state, {payload}) => {
            
        }
    }
})

export const {confirmPayment}  = paymentListSlice.actions
export default paymentListSlice.reducer

