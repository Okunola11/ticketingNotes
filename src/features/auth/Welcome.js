import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const username = useSelector(selectCurrentUser);

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h2>Welcome {username}!</h2>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Create a techNote</Link>
      </p>
      <p>
        <Link to="/dash/users">View User Setting</Link>
      </p>
      <p>
        <Link to="/dash/users/add">Add a New User</Link>
      </p>
    </section>
  );
  return content;
};
export default Welcome;
