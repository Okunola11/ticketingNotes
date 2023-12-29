import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useCreateNewUserMutation } from "./usersApiSlice";

const username_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const NewUserForm = () => {
  const [createNewUser, { isLoading, isSuccess, isError, error }] =
    useCreateNewUserMutation();

  const usernameRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onMatchChange = (e) => setMatchPassword(e.target.value);

  useEffect(() => {
    const valid = username_REGEX.test(username);
    setValidUsername(valid);
  }, [username]);

  useEffect(() => {
    setValidPassword(password_REGEX.test(password));
    const matchPass = password === matchPassword;
    setValidMatchPassword(matchPass);
  }, [password, matchPassword]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setMatchPassword("");
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewUser(username, password);
  };

  const content = (
    <section>
      <h1>Add New Users</h1>
      <p className={isError ? "errmsg" : "hide"}>{error}</p>

      <form onSubmit={handleSubmit}>
        {/*Username Form Input*/}
        <label htmlFor="username" aria-live="assertive">
          Username:
          <span className={validUsername ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validUsername && username ? "invalid" : "hide"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          value={username}
          onChange={onUsernameChange}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <p
          className={
            usernameFocus && username && !validUsername
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          4 t0 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letter, numbers, hypen, underscore allowed
          <br />
        </p>
        {/*Password Form Input*/}
        <label htmlFor="password" aria-live="assertive">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validPassword && password ? "invalid" : "hide"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> = <br />
          8 to 23 characters <br />
          Must include a uppercase, lowercase letters, a number and special
          characters <br />
          Allowed special characters: ! @ # $ %
        </p>
        {/*Password Match Form Input*/}
        <label htmlFor="confirmPassword">
          Confirm Password:
          <span className={validMatchPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={!validMatchPassword && password ? "invalid" : "hide"}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={matchPassword}
          onChange={onMatchChange}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          className={
            matchFocus && !validMatchPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          Must be the same as Password
        </p>
        <button
          disabled={
            !validUsername || !validMatchPassword || !validPassword || isLoading
              ? true
              : false
          }
        >
          Add User
        </button>
        <p>Already Register?</p> <br />
        <p>
          <Link to="/login">Sign In</Link>
        </p>
      </form>
    </section>
  );

  return content;
};
export default NewUserForm;
