import { configureStore } from '@reduxjs/toolkit';
import { idTokenSlice } from './idTokenSlice';
import skillsSlice from './skillsSlice';
import { userSlice } from './userSlice';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		idToken: idTokenSlice.reducer,
		skills: skillsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
