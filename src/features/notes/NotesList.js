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
      <table className="table--note">
        <thead className="table__thead">
          <tr>
            <th className="table__th">Status</th>
            <th className="table__th">Created</th>
            <th className="table__th">Updated</th>
            <th className="table__th">Title</th>
            <th className="table__th">Owner</th>
            <th className="table__th">Edit</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }

  return content;
};
export default NotesList;
