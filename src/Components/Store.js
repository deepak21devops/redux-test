import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./Posts/PostSlice";
export const store = configureStore({
  reducer: {
    posts: PostReducer,
  },
});
