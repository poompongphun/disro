'use client';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "@/store/countSlice"
import serverReducer from "@/store/serverSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        servers: serverReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch