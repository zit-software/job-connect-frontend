'use client';

import JobItem from '@/components/job-item';
/* eslint-disable @next/next/no-img-element */
import JobsFilter from '@/components/jobs-filter';
import { title } from '@/components/primitives';
import clsx from 'clsx';

export default function JobsPage() {
	return (
		<div className='container mx-auto max-w-[1280px] rounded-xl my-4 px-4'>
			<h2 className={clsx('block text-center my-8 text-4xl font-bold')}>
				Tìm kiếm việc làm tại{' '}
				<span className={title({ color: 'blue' })}>Job Connect</span>
			</h2>

			<JobsFilter />

			<div className='bg-background shadow-lg rounded-xl border p-2 mt-4 columns-2 gap-2'>
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
	);
}
