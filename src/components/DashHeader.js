import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faUserPlus,
  faFilePen,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname)
  )
    dashClass = "dash-header__container--small";

  /* const onButtonClick = async () => {   // I did this as a manuaver to navigate to home wi because of the
    await sendLogout();                     // constant headache the 'onQueryStarted' from authApiSlice gave
    if (isSuccess) console.log("success");  // me It didn't send isSuccess to be used by useEffect. I had to 
    navigate("/");                          // set a 1s timeout to logOut() as is in the authApiSlice to
  };                                        // make it work.
 */

  const onNewNoteClicked = () => {
    navigate("/dash/notes/new");
  };
  const onNewUserClicked = () => {
    navigate("/dash/users/add");
  };
  const onNotesButtonClicked = () => {
    navigate("/dash/notes");
  };
  const onUsersButtonClicked = () => {
    navigate("/dash/users");
  };

  const logOutButton = (
    <button onClick={sendLogout} className="icon-button" title="logout">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="Add Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="Add User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
        className="icon-button"
        title="Notes"
        onClick={onNotesButtonClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let usersButton = null;
  if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
    usersButton = (
      <button
        className="icon-button"
        title="Users"
        onClick={onUsersButtonClicked}
      >
        <FontAwesomeIcon icon={faUserGear} />
      </button>
    );
  }

  const buttonContent = isLoading ? (
    <p>Logging out...</p>
  ) : (
    <>
      {usersButton}
      {notesButton}
      {newNoteButton}
      {newUserButton}
      {logOutButton}
    </>
  );

  const content = (
    <>
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {/*We add navigation buttons later*/}
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  );
  return content;
};
export default DashHeader;
