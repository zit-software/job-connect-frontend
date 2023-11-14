import { BaseModel } from './BaseModel';
import { Job } from './Job';
import { Resume } from './Resume';
import { User } from './User';

export type JobApplyStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface JobApply extends BaseModel {
	user: User;
	resume: Resume;
	job: Job;
	coverLetter: string;
	status: JobApplyStatus;
}
