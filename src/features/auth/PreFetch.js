import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesAPiSlice } from "../notes/NotesApiSlice";

const PreFetch = () => {
  useEffect(() => {
    console.log("Suscribing");
    const notes = store.dispatch(notesAPiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("Unsuscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default PreFetch;
