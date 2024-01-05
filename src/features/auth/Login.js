import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();

  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password }).unwrap();

      console.log(response);
      dispatch(setCredentials({ ...response, username }));

      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.originalStatus) {
        setErrMsg("No response from server");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing username or password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      /*   errRef.current.focus(); */
    }
  };

  const content = (
    <>
      <header>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          style={{ display: "block" }}
        >
          {errMsg}
        </p>
        <h1 className="login__h1">Employee Login</h1>
      </header>
      <main className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            type="text"
            ref={userRef}
            autoComplete="off"
            placeholder="username"
            required
            value={username}
            onChange={onUsernameChange}
          />
          <input
            className="login__input"
            type="password"
            value={password}
            required
            placeholder="password"
            onChange={onPasswordChange}
          />

          <button>Login</button>

          <div className="form__active">
            <label htmlFor="persist">Trust this device?</label>
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={handleToggle}
              className="form__active--button"
            />
          </div>
        </form>
      </main>
    </>
  );

  return isLoading ? <p>Loading...</p> : content;
};
export default Login;
