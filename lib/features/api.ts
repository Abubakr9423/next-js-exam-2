import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = "http://localhost:3000";

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ['Todo', 'Auth'],
    endpoints: (builder) => ({
        getTodos: builder.query<any[], void>({
            query: () => `/data`,
            providesTags: ['Todo'],
        }),
        getVocations: builder.query<any[], void>({
            query: () => `/vocations`,
            providesTags: ['Todo'],
        }),
        getreports: builder.query<any[], void>({
            query: () => `/applications`,
            providesTags: ['Todo'],
        }),
        getTodoById: builder.query<any, number>({
            query: (id) => `/data/${id}`,
            providesTags: ['Todo'],
        }),

        addTodo: builder.mutation<any, Partial<any>>({
            query: (todo) => ({
                url: `/data`,
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        addVocations: builder.mutation<any, Partial<any>>({
            query: (todo) => ({
                url: `/vocations`,
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),

        editTodo: builder.mutation<any, any>({
            query: (todo) => ({
                url: `/data/${todo.id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        editVocations: builder.mutation<any, any>({
            query: (todo) => ({
                url: `/vocations/${todo.id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),

        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/data/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),


        deleteVocations: builder.mutation<void, number>({
            query: (id) => ({
                url: `/vocations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),

        checkboxtodo: builder.mutation<any, any>({
            query: (vocation) => ({
                url: `/data/${vocation.id}`,
                method: "PUT",
                body: {
                    ...vocation,
                    status: vocation.status === "true" ? "false" : "true"
                }
            }),
            invalidatesTags: ["Todo"],
        }),

        checkboxvocations: builder.mutation<any, any>({
            query: (vocation) => ({
                url: `/vocations/${vocation.id}`,
                method: "PUT",
                body: {
                    ...vocation,
                    status: vocation.status === "true" ? "false" : "true"
                }
            }),
            invalidatesTags: ["Todo"],
        }),
        login: builder.query<any, { phone: string; password: string }>({
            query: ({ phone, password }) =>
                `/accounts?phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`,
            providesTags: ['Auth'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetreportsQuery,
    useCheckboxvocationsMutation,
    useCheckboxtodoMutation,
    useGetVocationsQuery,
    useGetTodoByIdQuery,
    useAddTodoMutation,
    useAddVocationsMutation,
    useEditTodoMutation,
    useEditVocationsMutation,
    useDeleteTodoMutation,
    useDeleteVocationsMutation,
    useLazyLoginQuery,
} = todoApi;