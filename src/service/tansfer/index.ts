import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { bankAccount, makeTransferModel, retryTransferModel } from '../../transfer/types/stateTypes';
import { log } from 'console';
import { SECRET_KEY } from '@env';

const BASE_URL = "https://api.flutterwave.com/v3"

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = SECRET_KEY

export const getBanks = createAsyncThunk('transfer/banks', async () => {
    try {
        const resp = await axios.get('banks/NG')
        return resp.data
    } catch (error) {
        console.log("error is ", error);
    }
});

export const checkAccountFieldValidity = createAsyncThunk('transfer/bankAccountValidity', async (data: bankAccount) => {
    try {
        const resp = await axios.post('accounts/resolve', JSON.stringify(data),
            {
                headers: {
                    'Accept': "*/*",
                    'Content-Type': 'application/json'
                }
            })
        return resp.data
    } catch (error) {
        if (error.response) {
            if (error.response.data.message !== undefined) {
                return error.response.data
            }
        }
        return { "message": "Something went wrong..." }
    }
});

export const makeTransferService = createAsyncThunk('transfer/makeTransfer', async (data: makeTransferModel) => {
    try {
        let resp = await axios.post('transfers', JSON.stringify(data),
            {
                headers: {
                    'Accept': "*/*",
                    'Content-Type': 'application/json'
                }
            });
        return resp.data
    } catch (error) {
        if (error.response) {
            if (error.response.data.message !== undefined) {
                return error.response.data
            }
        }
        return { "message": "Something went wrong..." }
    }
});

export const confirmTransferService = createAsyncThunk('transfer/confirmTransfer', async (data: retryTransferModel) => {
    try {
        let resp = await axios.post('transactions/' + data.id + "/verify", JSON.stringify(data),
            {
                headers: {
                    'Accept': "*/*",
                    'Content-Type': 'application/json'
                }
            });
        return resp.data
    } catch (error) {
        console.log("error is ", error)
        if (error.response) {
            console.log("status is ", error.response.status);
            console.log("data is ", error.response.data);
            if (error.response.data.message !== undefined) {
                return error.response.data
            }
        }
        return { "message": "Something went wrong..." }
    }
});

export const retryTransferService = createAsyncThunk('transfer/retryTransfer', async (data: retryTransferModel) => {
    try {
        let resp = await axios.post('transfers/' + data.id + "/retries", JSON.stringify(data),
            {
                headers: {
                    'Accept': "*/*",
                    'Content-Type': 'application/json'
                }
            });
        return resp.data
    } catch (error) {
        if (error.response) {
            if (error.response.data.message !== undefined) {
                return error.response.data
            }
        }
        return { "message": "Something went wrong..." }
    }
});