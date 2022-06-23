import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,

            templates: {
              like: 0,
              share: 0,
              subscribe: 1,
            },
          },
        };
      },
    },
    addEmoji: (state, action) => {
      const { postId, reaction, post } = action.payload;
      console.log(postId, reaction, post);
      state.posts = post.templates[reaction]++;
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
          subscribe: 1,
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

export const { addEmoji, addPost } = PostSlice.actions;

export default PostSlice.reducer;
