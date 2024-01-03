import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();

  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

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
      /* errRef.current.focus(); */
    }
  };

  const content = (
    <section className="login">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>

      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__h2">Login</h2>
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
      </form>
    </section>
  );

  return isLoading ? <p>Loading...</p> : content;
};
export default Login;
