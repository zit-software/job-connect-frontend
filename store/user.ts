import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

export interface UserState {
	id: number;
	fullName: string;
	email: string;
	avatar: string;
	phoneNumber: string;
	userRole: 'APPLICANT' | 'RECRUITER';
	gender: 'MALE' | 'FEMALE';
	role: 'USER' | 'ADMIN';
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

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
