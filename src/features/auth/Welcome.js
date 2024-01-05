import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  // I was using the selectCurrentUser from authSlice for the username before but had to remove it because username was not being sent back or saved to setCredentials from the refresh endpoint. The useAuth() hook solves this.
  const { username, isAdmin, isManager } = useAuth();

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
      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users">View User Setting</Link>
        </p>
      )}
      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users/add">Add a New User</Link>
        </p>
      )}
    </section>
  );
  return content;
};
export default Welcome;
