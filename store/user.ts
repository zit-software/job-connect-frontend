import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

export interface UserState {
	fullName: string;
	email: string;
	avatar: string;
	token: string;
	refreshToken: string;
	isAuth: boolean;
}

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

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
