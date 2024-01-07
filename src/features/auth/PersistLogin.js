import { useState, useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Outlet, Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
  const effectRan = useRef(false);
  const [persist] = usePersist();
  const [refresh, { isLoading, isSuccess, isError, error, isUninitialized }] =
    useRefreshMutation();

  const token = useSelector(selectCurrentToken);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!effectRan.current) {
      const refreshToken = async () => {
        console.log("Sending refresh token");
        try {
          await refresh();
          setSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) refreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    console.log("No persist");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("Loading..");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    console.log("isError");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && success) {
    console.log("Persist success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token & uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
