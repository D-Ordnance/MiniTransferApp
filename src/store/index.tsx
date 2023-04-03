import { configureStore } from "@reduxjs/toolkit";
import transferReducer from "../store/bankTansferSlice"
import paymentListReducer from "../store/paymentListSlice"


export const store = configureStore({
    reducer: {
        transfer: transferReducer,
        paymentInfo: paymentListReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch