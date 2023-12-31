import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { usersApiSlice } from "./features/users/usersApiSlice";
import { notesAPiSlice } from "./features/notes/NotesApiSlice";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
store.dispatch(notesAPiSlice.endpoints.getNotes.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
