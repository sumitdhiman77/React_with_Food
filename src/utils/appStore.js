import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantNameSlice";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  restaurant: restaurantReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk],
});
export const persistor = persistStore(appStore);
