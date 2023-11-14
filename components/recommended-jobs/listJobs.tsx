'use client';

import matchingService from '@/services/matching.service';
import { useQuery } from 'react-query';
import JobItem from '../job-item';

interface ListJobProps {
	resumeId?: number;
}
export default function ListJob({ resumeId }: ListJobProps) {
	const { data: jobList, isLoading } = useQuery(
		['jobList', resumeId],
		() => matchingService.suggestJobsForResume(resumeId as number),
		{ enabled: !!resumeId },
	);

	if (!resumeId) {
		return <div>Vui lòng chọn resume để gợi ý công việc</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='min-h-[800px] grid grid-cols-1 gap-2'>
			{(jobList?.result || []).map((job) => (
				<div key={job.id} className='relative'>
					<JobItem job={job} />
					<div className='w-16 h-16 bg-gradient-to-tr from-green-400 to-green-500 rounded-full absolute right-4 top-4 flex justify-center items-center'>
						<span className='text-white font-bold'>{(job.score * 100).toFixed(0)}%</span>
					</div>
				</div>
			))}
		</div>
	);
}
