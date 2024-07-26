import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
  },
  reducers: {
    showUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    RemoveUserInfo: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { showUserInfo, RemoveUserInfo } = userSlice.actions;
export default userSlice.reducer;
