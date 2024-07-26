import { createSlice } from "@reduxjs/toolkit";
const restaurantNameSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantName: [],
  },
  reducers: {
    addRestaurantName: (state, action) => {
      state.restaurantName.push(action.payload);
    },
    clearRestaurantData: (state) => {
      state.restaurantName.length = 0;
    },
  },
});
export const { addRestaurantName, clearRestaurantData } =
  restaurantNameSlice.actions;
export default restaurantNameSlice.reducer;
