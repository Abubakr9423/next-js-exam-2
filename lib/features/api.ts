import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = "http://localhost:3000"; // base URL for both data and accounts

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ['Todo', 'Auth'],
    endpoints: (builder) => ({
        // ===== DATA CRUD =====
        getTodos: builder.query<any[], void>({
            query: () => `/data`,
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

        editTodo: builder.mutation<any, any>({
            query: (todo) => ({
                url: `/data/${todo.id}`,
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

        // ===== LOGIN =====
        login: builder.query<any, { phone: string; password: string }>({
            query: ({ phone, password }) =>
                `/accounts?phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`,
            providesTags: ['Auth'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetTodoByIdQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
    useLazyLoginQuery, // useLazy for on-demand login
} = todoApi;
