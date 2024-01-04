import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

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
  const logOutButton = (
    <button onClick={sendLogout} className="icon-button" title="logout">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/*We add navigation buttons later*/}
          {logOutButton}
        </nav>
      </div>
    </header>
  );
  return content;
};
export default DashHeader;
