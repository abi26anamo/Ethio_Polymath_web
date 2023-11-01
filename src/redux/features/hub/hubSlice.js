import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import hubService from './hubService'


const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isAllHubs: false,
    isSingleHub: false,
    isHubCreated: false,
    hub: null,
    hubs: null,
    message: ''
}

// Fetch all hubs
export const getAllHubs = createAsyncThunk('hub/hub-all', async (_, thunkAPI) => {
    try {
        return await hubService.getAllHubs()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Fetch single hub
export const getsingleHub = createAsyncThunk('hub/hub-single', async (id, thunkAPI) => {
    try {
        return await hubService.getsingleHub(id)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create hub
export const createHub = createAsyncThunk('hub/hub-create', async (data, thunkAPI) => {
    try {
        return await hubService.createHub(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isAllHubs = false
            state.isSingleHub = false
            state.isHubCreated = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllHubs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllHubs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isAllHubs = true
                state.hubs = action.payload
            })
            .addCase(getAllHubs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getsingleHub.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getsingleHub.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isSingleHub = true
                state.hub = action.payload
            })
            .addCase(getsingleHub.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createHub.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHub.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isHubCreated = true
                state.message = action.payload
            })
            .addCase(createHub.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = hubSlice.actions

export default hubSlice.reducer