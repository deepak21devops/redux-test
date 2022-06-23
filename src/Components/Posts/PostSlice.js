import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  error: "",
  status: "idle",
};

export const fetchPosts = createAsyncThunk("thunk/fetchUsers", async () => {
  try {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return resp.data;
  } catch (err) {
    return err.message;
  }
});

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addEmoji: (state, action) => {
      const { postId, reaction, post } = action.payload;

      console.log(state.posts.posts);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      return { ...state.posts, status: "Pending" };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const loadedPost = action.payload.map((pst) => {
        pst.date = new Date().toLocaleString();
        pst.templates = {
          like: 0,
          share: 0,
          subscribe: 0,
        };
        return pst;
      });

      return {
        ...state.posts,
        status: "FulFilled",
        posts: loadedPost,
      };
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      return {
        ...state.posts,
        status: "Rejected",
        error: action.error.message,
      };
    });
  },
});

export const allPosts = (state) => state.posts.posts;
export const error = (state) => state.posts.error;
export const status = (state) => state.posts.status;

export const { addEmoji } = PostSlice.actions;

export default PostSlice.reducer;
