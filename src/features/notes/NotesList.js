import { useGetNotesQuery } from "./NotesApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = notes;
    const tableData = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
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
