import { useSelector } from "react-redux";
import { selectNotesById } from "./NotesApiSlice";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

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
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>
        <td className="table__cell">
          <button onClick={handleEdit}>Edit</button>
        </td>
      </tr>
    );

    return content;
  } else return null;
};

const memoisedNote = memo(Note);
export default memoisedNote;
