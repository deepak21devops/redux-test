import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./Components/Store";
import { fetchPosts } from "./Components/Posts/PostSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchPosts());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
