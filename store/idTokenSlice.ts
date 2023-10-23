import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const idTokenSlice = createSlice({
	name: 'idToken',
	initialState: null as string | null,
	reducers: {
		setIdToken: (state, action) => {
			state = action.payload;

			return state;
		},
	},
});

export const { setIdToken } = idTokenSlice.actions;
export const selectIdToken = (state: RootState) => state.idToken;

export { idTokenSlice };
export default idTokenSlice.reducer;
