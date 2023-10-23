import { Skill } from '@/models/Skill';
import { createSlice } from '@reduxjs/toolkit';

export interface CachedSkills {
	[key: number | string]: Skill;
}

const skillsSlice = createSlice({
	name: 'skill',
	initialState: {
		cachedSkills: {} as CachedSkills,
	},
	reducers: {
		addSkills(state, { payload }) {
			const cachedSkills = JSON.parse(JSON.stringify(state.cachedSkills)) as CachedSkills;

			for (const skill of payload) {
				cachedSkills[skill.id] = skill;
			}

			return { ...state, cachedSkills };
		},
	},
});

export const { addSkills } = skillsSlice.actions;
export default skillsSlice;
