import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";
import { productsReducer } from "./reducers/products.reducer.js";
import { eventsReducer } from "./reducers/events.reducer.js";


const Store = configureStore({
    reducer: {
         user : userReducer,
         seller : sellerReducer,
         products : productsReducer,
         events : eventsReducer,
    }
})

export default Store;