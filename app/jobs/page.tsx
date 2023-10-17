'use client';

import logoLottie from '@/assets/lotties/logo.json';
import JobItem from '@/components/job-item';
import JobsFilter from '@/components/jobs-filter';
import { title } from '@/components/primitives';
import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';

export default function JobsPage() {
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

			<JobsFilter />

			<div className='rounded-xl mt-4'>
				<div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
					<JobItem />
				</div>
			</div>

			<div className='flex justify-center mt-4'>
				<Pagination total={10} variant='bordered' size='lg' />
			</div>
		</div>
	);
}
