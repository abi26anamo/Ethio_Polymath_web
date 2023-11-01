import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import upcomingService from './upcomingService'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isUpcomingFetch: false,
    isUpcomingCreated: false,
    isUpcomingDeleted: false,
    message: '',
    upcomings: null
}

// get upcoming content
export const getUpcoming = createAsyncThunk('upcoming/get', async (_, thunkAPI) => {
    try {
        return await upcomingService.getUpcoming()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create upcoming content
export const createUpcoming = createAsyncThunk('upcoming/create', async (data, thunkAPI) => {
    try {
        return await upcomingService.createUpcoming(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete upcoming content
export const deleteUpcoming = createAsyncThunk('upcoming/delete', async (data, thunkAPI) => {
    try {
        return await upcomingService.deleteUpcoming(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const upcomingSlice = createSlice({
    name: 'upcomimg',
    initialState,
    reducers: {
        resetUpcoming: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isUpcomingFetch = false
            state.isUpcomingCreated = false
            state.isUpcomingDeleted = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUpcoming.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUpcoming.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpcomingFetch = true
                state.upcomings = action.payload
            })
            .addCase(getUpcoming.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.upcomings = []
            })
            .addCase(createUpcoming.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUpcoming.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpcomingCreated = true
                state.message = action.payload.data
            })
            .addCase(createUpcoming.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUpcoming.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUpcoming.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpcomingDeleted = true
                state.message = action.payload.message
            })
            .addCase(deleteUpcoming.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetUpcoming } = upcomingSlice.actions

export default upcomingSlice.reducer