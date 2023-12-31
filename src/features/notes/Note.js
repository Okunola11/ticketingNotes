import { useSelector } from "react-redux";
import { selectNotesById } from "./NotesApiSlice";

import { useNavigate } from "react-router-dom";

const Note = ({ noteId }) => {
  const navigate = useNavigate();

  const note = useSelector((state) => selectNotesById(state, noteId));

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-Us", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(note.updatedAt).toLocaleString("en-Us", {
      day: "numeric",
      month: "long",
    });

    const noteStatus = note.completed ? <p>Completed</p> : <p>Open</p>;
    const statusClass = note.completed ? "note--completed" : "note--inactive";

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    const content = (
      <tr>
        <td className={`table__cell ${statusClass}`}>{noteStatus}</td>
        <td className="table__cell">{created}</td>
        <td className="table__cell">{updated}</td>
        <td className="table__cell">{note.title}</td>
        <td className="table__cell">{note.username}</td>
        <td className="table__cell">
          <button onClick={handleEdit}>Edit</button>
        </td>
      </tr>
    );

    return content;
  } else return null;
};
export default Note;
