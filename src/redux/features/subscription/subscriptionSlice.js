import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import subscriptionService from './subscriptionService'


const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isSubscriptionCreated: false,
    isProductCreated: false,
    isArchiveDeleted: false,
    isSubscriptionSetting: false, 
    archiveList: null,
    message: ''
}

// create subscription
export const createSubscription = createAsyncThunk('subscription/create', async (data, thunkAPI) => {
    try {
        return await subscriptionService.createSuscription(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create product
export const createProduct = createAsyncThunk('subscription/create-product', async (data, thunkAPI) => {
    try {
        return await subscriptionService.createProduct(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get archived list
export const getArchivedList = createAsyncThunk('subscription/archived-get', async (_, thunkAPI) => {
    try {
        return await subscriptionService.getArchivedList()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete archived list
export const deleteArchivedList = createAsyncThunk('subscription/archived-delete', async (data, thunkAPI) => {
    try {
        return await subscriptionService.deleteArchivedList(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// subscription Setting
export const subscriptionSetting = createAsyncThunk('subscription/subscription-settings', async (data, thunkAPI) => {
    try {
        return await subscriptionService.subscriptionSetting(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isSubscriptionCreated = false
            state.isProductCreated = false
            state.isArchiveDeleted = false
            state.isSubscriptionSetting = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubscription.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSubscription.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isSubscriptionCreated = true
                state.message = action.payload
            })
            .addCase(createSubscription.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isProductCreated = true
                state.message = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getArchivedList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getArchivedList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.archiveList = action.payload
            })
            .addCase(getArchivedList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.archiveList = []
            })
            .addCase(deleteArchivedList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteArchivedList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isArchiveDeleted = true
                state.message = action.payload
            })
            .addCase(deleteArchivedList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(subscriptionSetting.pending, (state) => {
                state.isLoading = true
            })
            .addCase(subscriptionSetting.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isSubscriptionSetting = true
                state.message = action.payload
            })
            .addCase(subscriptionSetting.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = subscriptionSlice.actions

export default subscriptionSlice.reducer