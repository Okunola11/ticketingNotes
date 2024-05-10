import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { PulseLoader } from "react-spinners";

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
      if (!err.status) {
        setErrMsg("No response from server");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      /*   errRef.current.focus(); */
    }
  };

  const content = (
    <>
      <header className="login__header">
        <h1 className="login__h1">Employee Login</h1>
      </header>
      <main className="login">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          style={{ display: "block" }}
        >
          {errMsg}
        </p>
        <article className="login__article">
          <section className="login__info">
            <h2>Hi, welcome 👋</h2>
            <p className="login__info-p">
              This primarily display brief information or updates for Employees
              but I have decided to put in login credentials details for the
              sole purpose of exploring and testing the application.
            </p>
            <h5>Login with the following credentials:</h5>
            <div className="login-details-container">
              <div className="login-details">
                <div className="login-details__div">
                  <p>Username: Rifle2</p>
                  <p>Password: shot2</p>
                  <p>Roles: Employee</p>
                </div>
                <div className="login-details__div">
                  <p>Username: ChunLee</p>
                  <p>Password: Aa1!</p>
                  <p>Roles: Employee/Admin/Manager</p>
                </div>
              </div>
            </div>
          </section>
          <section className="login__form">
            <form className="login__form-form" onSubmit={handleSubmit}>
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

              <button className="login__button">Login</button>

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
          </section>
        </article>
      </main>
      <footer className="login__footer">
        <Link to="/">Back to Home</Link>
      </footer>
    </>
  );

  return isLoading ? <PulseLoader color={"#FFF"} /> : content;
};
export default Login;
