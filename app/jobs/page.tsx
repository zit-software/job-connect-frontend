'use client';

import logoLottie from '@/assets/lotties/logo.json';
import PageLoading from '@/components/PageLoader';
import EmptyMessage from '@/components/emty-message';
import JobItem from '@/components/job-item';
import JobsFilter from '@/components/jobs-filter';
import { title } from '@/components/primitives';
import jobService, { FindJobDto } from '@/services/job.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function JobsPage() {
	const [filter, setFilter] = useState<FindJobDto>({});

	const { data: jobs, isLoading } = useQuery(['jobs', filter], () => jobService.getAllJobs(filter));

	const [jobListParent] = useAutoAnimate();

	return (
		<div className='container mx-auto max-w-[1280px] rounded-xl my-4 px-4'>
			<Lottie
				animationData={logoLottie}
				className='w-48 h-48 rounded-3xl shadow-xl shadow-blue-200 overflow-hidden mx-auto'
			/>

			<h2
				className={clsx(
					'my-8 text-2xl text-default-600 font-bold flex flex-col text-center justify-center items-center gap-2',
				)}
			>
				Tìm kiếm việc làm tại <span className={clsx(title({ color: 'blue' }), 'font-black')}>Job Connect</span>
			</h2>

			<JobsFilter onFiltered={setFilter} isSearching={isLoading} />

			<div className='rounded-xl mt-4'>
				{isLoading && <PageLoading />}
				{!jobs?.numberOfElements && (
					<EmptyMessage message='Chúng tôi không tìm thấy công việc nào phù hợp với các tiêu chí mà bạn đã đặt ra' />
				)}
				<div className='grid md:grid-cols-2 grid-cols-1 gap-2' ref={jobListParent}>
					{jobs?.content.map((job) => <JobItem key={job.id} job={job} />)}
				</div>
			</div>

			<div className='flex justify-center mt-4'>
				{jobs && <Pagination total={jobs.totalPages} page={jobs.number + 1} variant='bordered' size='lg' />}
			</div>
		</div>
	);
}
