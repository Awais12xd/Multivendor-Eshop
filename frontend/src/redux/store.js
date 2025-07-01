import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user.reducer.js";


const Store = configureStore({
    reducer: {
         user : userReducer
    }
})

export default Store;