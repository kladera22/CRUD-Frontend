// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api/v1/" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `user`,
            providesTags: (result, error, arg) => (result ? [...result.map(({ id }) => ({ type: "User", id })), "User"] : ["User"]),
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: `/user`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/user/${user._id}`,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: `/user/login`,
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
        }),
    }),
});

// Export hooks for usage in futional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, useLoginMutation } = userApi;
