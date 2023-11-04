import { Job } from './Job';

export interface RankedJob extends Job {
	score: number;
}
