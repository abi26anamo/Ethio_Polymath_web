import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import accountReducer from './features/account/accountSlice'
import hubReducer from './features/hub/hubSlice'
import upcomingReducer from './features/upcoming/upcomingSlice'
import subscriptionReducer from './features/subscription/subscriptionSlice'
import feedbackReducer from './features/feedback/feedbackSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        hub: hubReducer,
        upcoming: upcomingReducer,
        subscription: subscriptionReducer,
        feedback: feedbackReducer,
    },
    devTools: true
})    