import { useSelector } from "react-redux";
import { selectNotesById } from "./NotesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import { useParams } from "react-router-dom";

import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  const note = useSelector((state) => selectNotesById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditNote;
