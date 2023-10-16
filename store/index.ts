import { configureStore } from '@reduxjs/toolkit';
import { idTokenSlice } from './idToken';
import { userSlice } from './user';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		idToken: idTokenSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
