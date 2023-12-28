import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedData = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, arg, erro) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    createNewUser: builder.mutation({
      query: (initialData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialData,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// select all gotten users
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// create a memoised selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // creates a normalised state obj with ids & entities
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
