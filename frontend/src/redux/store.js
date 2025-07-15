import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";


const Store = configureStore({
    reducer: {
         user : userReducer,
         seller : sellerReducer
    }
})

export default Store;