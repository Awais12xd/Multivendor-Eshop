import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";
import { productsReducer } from "./reducers/products.reducer.js";
import { eventsReducer } from "./reducers/events.reducer.js";
import { allProductsreducer } from "./reducers/allProducts.reducer.js";
import { allEventsReducer } from "./reducers/allEvents.reducer.js";
import { cartReducer } from "./reducers/cart.reducer.js";
import { wishlistReducer } from "./reducers/wishlist.reducer.js";
import { ordersReducer } from "./reducers/order.reducer.js";


const Store = configureStore({
    reducer: {
         user : userReducer,
         seller : sellerReducer,
         products : productsReducer,
         events : eventsReducer,
         allProducts : allProductsreducer,
         allEvents : allEventsReducer,
         cart:cartReducer,
         wishlist:wishlistReducer,
         orders : ordersReducer
    }
})

export default Store;