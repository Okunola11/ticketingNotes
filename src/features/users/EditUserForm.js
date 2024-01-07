import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import ROLES from "../../components/Roles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";

const password_REGEX = /^([A-z0-9!@#$%]).{3,12}$/;
const username_REGEX = /^[A-z0-9]{3,20}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    const valid = username_REGEX.test(username);
    setValidUsername(valid);
  }, [username]);

  useEffect(() => {
    setValidPassword(password_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onActiveChange = (e) => setActive((prev) => !prev);

  const rolesOption = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });
  const onRolesChange = (e) => {
    const options = [...e.target.selectedOptions];
    const value = options.map((option) => option.value);
    setRoles(value);
  };

  let canSave;
  if (password) {
    canSave =
      [validUsername, validPassword, roles.length].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, roles.length].every(Boolean) && !isLoading;
  }

  const handleSubmit = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, active, roles });
    } else {
      await updateUser({ id: user.id, username, active, roles });
    }
  };

  const handleDelete = async () => {
    await deleteUser({ id: user.id });
  };

  const errClass = isError || isDelError ? "errmsg" : "hide";
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <form className="newUser" onSubmit={(e) => e.preventDefault()}>
      <p className={errClass}>{errContent}</p>

      <div className="form__heading">
        <div>
          <h2>Edit User</h2>
        </div>
        <div>
          <button
            disabled={!canSave}
            type="button"
            className="form__icon"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button type="button" className="form__icon" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
      <label className="form__label" htmlFor="username">
        Username:
      </label>
      <input
        className="form__input"
        type="text"
        id="username"
        value={username}
        onChange={onUsernameChange}
      />
      <label className="form__label" htmlFor="password">
        Password:
      </label>
      <input
        className="form__input"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <label className="form__active" htmlFor="active">
        Active:
        <input
          className="form__active--button"
          type="checkbox"
          id="active"
          checked={active}
          onChange={onActiveChange}
        />
      </label>

      <label className="form__label form__roles" htmlFor="roles">
        Roles:
      </label>
      <select
        className="form__select"
        id="roles"
        name="roles"
        multiple={true}
        value={roles}
        onChange={onRolesChange}
      >
        {rolesOption}
      </select>
    </form>
  );

  return content;
};
export default EditUserForm;
