import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import productReducer from './features/product/productSlice';
import orderReducer from './features/order/orderSlice';
import cartReducer from './features/order/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export default store;
