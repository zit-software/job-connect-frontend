'use client';

import matchingService from '@/services/matching.service';
import { useQuery } from 'react-query';
import JobItem from '../job-item';

interface ListJobProps {
	resumeIterable: IterableIterator<number>;
}
export default function ListJob({ resumeIterable }: ListJobProps) {
	const resumeId = resumeIterable.next().value;
	const { data: jobList, isLoading } = useQuery(['jobList', resumeId], () =>
		matchingService.suggetJobsForResume(resumeId as number),
	);
	if (!resumeId) {
		return <div>Vui lòng chọn resume để gợi ý công việc</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='h-[800px]'>
			{(jobList?.result || []).map((job) => (
				<JobItem job={job} key={job.id} />
			))}
		</div>
	);
}
