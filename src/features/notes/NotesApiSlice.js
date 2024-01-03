import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter.getInitialState();

export const notesAPiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedData = responseData.map((note) => {
          note.id = note._id;
          return note;
        });

        return notesAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else {
          return [{ type: "Note", id: "LIST" }];
        }
      },
    }),
    createNewNote: builder.mutation({
      query: (initialData) => ({
        url: "/notes",
        method: "POST",
        body: { ...initialData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialData) => ({
        url: "/notes",
        method: "PATCH",
        body: { ...initialData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesAPiSlice;

// select all gotten notes
export const selectNotesResult = notesAPiSlice.endpoints.getNotes.select();

// creating a memoised selector
const selectNotesData = createSelector(
  selectNotesResult,
  (noteResult) => noteResult.data // this creates a normalised state with ids & entities
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
