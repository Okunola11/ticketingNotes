import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import RequireAuth from "./features/auth/RequireAuth";
import ROLES from "./components/Roles";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/*From here are the protected routes*/}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>

              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path="add" element={<NewUserForm />} />
                <Route path=":id" element={<EditUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
