import { useEffect, useState } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./NotesApiSlice";
import { useNavigate } from "react-router-dom";

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId({});
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompletedChange = (e) => setCompleted((prev) => !prev);
  const onUserIdChange = (e) => setUserId(e.target.value);

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });
  console.log(options);

  const canSave = [title, text, completed, userId].every(Boolean) && !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "hide";
  const err = error?.data?.message || delError?.data?.message;

  const handleUpdate = async () => {
    await updateNote({ id: note.id, user: userId, title, text, completed });
  };

  const handleDelete = async () => {
    await deleteNote({ id: note.id });
  };

  const content = (
    <section className="edit">
      <p className={errClass}>{err}</p>
      <form className="edit__form" onSubmit={(e) => e.preventDefault()}>
        <h2>Edit notes</h2>
        {/* || TITLE*/}
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={onTitleChange} />
        {/* || TEXT*/}
        <label htmlFor="text">Text</label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={onTextChange}
          cols="30"
          rows="10"
        ></textarea>
        {/* || COMPLETED*/}
        <label className="completed" htmlFor="completed">
          Completed
          <input
            className="completed__input"
            type="checkbox"
            id="completed"
            value={completed}
            onChange={onCompletedChange}
          />
        </label>

        {/* || USER ID*/}
        <label htmlFor="userId">Username</label>
        <select
          name="userId"
          id="userId"
          value={userId}
          onChange={onUserIdChange}
        >
          {options}
        </select>
      </form>
      <button disabled={!canSave} type="button" onClick={handleUpdate}>
        Update
      </button>
      <button type="button" className="edit__del" onClick={handleDelete}>
        Delete Note
      </button>
    </section>
  );

  return content;
};
export default EditNoteForm;
