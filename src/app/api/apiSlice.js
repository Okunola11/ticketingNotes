import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ticketingnotes-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("Sending refresh token");

    //Send the refresh token to get a new accessToken
    const refreshResult = await baseQuery("/auth/pops", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const username = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, username }));
      // retry again with the access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.originalStatus === 403) {
        refreshResult.error.data.message = "Your login expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Note"],
  endpoints: (builder) => ({}),
});
