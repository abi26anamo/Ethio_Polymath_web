import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import feedbackService from './feedbackService'


const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isNewFeedback: false,
    message: ''
}

// new feedback
export const newFeedback = createAsyncThunk('feedback/new', async (data, thunkAPI) => {
    try {
        return await feedbackService.newFeedback(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isNewFeedback = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newFeedback.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newFeedback.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isNewFeedback = true
                state.message = action.payload
            })
            .addCase(newFeedback.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = feedbackSlice.actions

export default feedbackSlice.reducer