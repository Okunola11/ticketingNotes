import { useGetNotesQuery } from "./NotesApiSlice";
import Note from "./Note";

import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter((id) => entities[id].username === username);
    }
    console.log(filteredIds);
    const tableData = filteredIds?.length
      ? filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className="table table--note">
        <thead className="table__thead">
          <tr>
            <th className="table__th note__status">Status</th>
            <th className="table__th note__created">Created</th>
            <th className="table__th note__updated">Updated</th>
            <th className="table__th note__title">Title</th>
            <th className="table__th note__username">Owner</th>
            <th className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }

  return content;
};
export default NotesList;
