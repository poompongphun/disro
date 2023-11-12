import Project from '@/Class/Project'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/utils/axios'


export interface ProjectsState {
    value: Project[]
    loading: boolean,
    error: any,
}

const initialState: ProjectsState = {
    value: [],
    loading: false,
    error: null,
}

// const getServers = async () => {
//     const res = await axios.get("/servers");
//     return res.data;
// };

export const fetchData = createAsyncThunk('projects/fetchData', async data => {
    console.log(data);

    const res = await axios.get("/manageserver-service/servers");
    return res.data;
});

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.value = action.payload
        },
        addProjects: (state, action: PayloadAction<Project>) => {
            state.value.push(action.payload)
        },
        deleteProjects: (state, action: PayloadAction<Project>) => {
            state.value = state.value.filter((project) => project._id !== action.payload._id)
        },
        updateProjects: (state, action: PayloadAction<Project>) => {
            state.value = state.value.map((project) => {
                if (project._id === action.payload._id) {
                    return action.payload
                }
                return project
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

// Action creators are generated for each case reducer function
export const { setProjects, addProjects, deleteProjects, updateProjects } = projectsSlice.actions

export default projectsSlice.reducer