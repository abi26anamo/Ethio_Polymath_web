import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

// get user from local storage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoggedIn: false,
    isLoggedOut: true,
    isUserUpdated: false,
    message: ''
}   
// register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    }catch(error) {
        if (error.response && error.response.status === 409) {
          return thunkAPI.rejectWithValue('Email already exists');
        } else {
          return thunkAPI.rejectWithValue('Registration failed');
        }
      }
});

// login user
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await authService.login(data.email, data.password)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update user
export const update = createAsyncThunk('auth/update', async (data, thunkAPI) => {
    try {
        return await authService.update(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isUserUpdated = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isLoggedIn = true
                state.isLoggedOut = false
                state.user = action.payload
            })      
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isLoggedIn = false     
                state.isLoggedOut = true
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isUserUpdated = true
                state.user = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }).addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.isLoggedOut = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer