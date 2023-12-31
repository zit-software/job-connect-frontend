import { User } from '@/models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

export type UserState = User;

export const userSlice = createSlice({
	name: 'user',
	initialState: null as UserState | null,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state = action.payload;

			return state;
		},
	},
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
