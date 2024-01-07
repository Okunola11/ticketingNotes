import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNewNoteMutation } from "./NotesApiSlice";

const NewNoteForm = ({ users }) => {
  const navigate = useNavigate();

  const [createNewNote, { isLoading, isSuccess, isError, error }] =
    useCreateNewNoteMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewNote({ title, text, user: userId });
  };

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const content = (
    <section className="edit">
      <p className={isError ? "errmsg" : "hide"}>{error?.data?.message}</p>
      <form className="edit__form">
        <h2>Create a Note</h2>
        {/* || TITLE*/}
        <label htmlFor="title">Title</label>
        <input
          className="form__input"
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
        />
        {/* || TEXT*/}
        <label htmlFor="text">Text</label>
        <textarea
          className="form__text"
          name="text"
          id="text"
          value={text}
          onChange={onTextChange}
          cols="30"
          rows="10"
        ></textarea>
        {/* || USER*/}
        <label htmlFor="userId">Username</label>
        <select
          className="form__roles"
          name="userId"
          id="userId"
          value={userId}
          onChange={onUserIdChange}
        >
          {options}
        </select>
        <button disabled={!canSave} type="submit" onClick={handleSubmit}>
          Create Note
        </button>
      </form>
    </section>
  );

  return content;
};
export default NewNoteForm;
