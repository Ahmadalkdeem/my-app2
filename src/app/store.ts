import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productSlice from '../features/cards/cardshirts'
import productSlice2 from '../features/cards/cardPants'
import productSlice3 from '../features/cards/cardshose'
import orders from '../features/cards/orderdetales'
import cart from '../features/cards/mycart'
import user from '../features/user/user'
import users from '../features/cards/users';
import Performence from '../features/user/Performence';

export const store = configureStore({
  reducer: {
    cardshirts: productSlice,
    cardPants: productSlice2,
    cardshose: productSlice3,
    orders: orders,
    mycart: cart,
    user: user,
    users: users,
    Performence: Performence,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
