import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decode = jwtDecode(token);

    const { username, roles } = decode?.UserInfo;

    const isManager = roles.includes("Manager") ? true : false;

    const isAdmin = roles.includes("Admin") ? true : false;

    return { username, roles: [], isManager, isAdmin };
  }
};
export default useAuth;
