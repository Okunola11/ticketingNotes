import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";

const UsersList = () => {
  useTitle("techNotes: Users List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;
    const tableData = ids.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th className="table__th user__username" scope="col">
              Username
            </th>
            <th className="table__th user__roles" scope="col">
              Roles
            </th>
            <th className="table__th user__edit" scope="col">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
