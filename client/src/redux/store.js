import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/auth";
import { postsReducer } from "./slices/post";

const store = configureStore({
  reducer: {
    auth: userReducer,
    posts: postsReducer,
  },
});

export default store;
