import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import accountService from './accountService'

const initialState = {
    user: null,
    community: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isUpdated: false,
    isCommunity: false,
    message: ''
}   
// update profile picture of the user
export const updateProfilePicture = createAsyncThunk('account/update-picture', async (userData, thunkAPI) => {
    try {
        return await accountService.updateProfilePicture(userData);
    }catch(error) {
        if (error.response && error.response.status === 409) {
          return thunkAPI.rejectWithValue('Email already exists');
        } else {
          return thunkAPI.rejectWithValue('Registration failed');
        }
      }
});

// update cover photo of the user
export const updateProfileCover = createAsyncThunk('account/update-cover', async (data, thunkAPI) => {
    try {
        return await accountService.updateProfileCover(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update community details of the user
export const updateCommunityInfo = createAsyncThunk('account/update-info', async (data, thunkAPI) => {
    try {
        return await accountService.updateCommunityInfo(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isUpdated = false
            state.isCommunity = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfilePicture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpdated = true
                state.user = action.payload
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProfileCover.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfileCover.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpdated = true
                state.user = action.payload
            })
            .addCase(updateProfileCover.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateCommunityInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCommunityInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUpdated = true
                state.isCommunity = true
                state.community = action.payload
            })
            .addCase(updateCommunityInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = accountSlice.actions

export default accountSlice.reducer