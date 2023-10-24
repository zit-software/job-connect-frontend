'use client';

import ErrorMessage from '@/components/ErrorMessage';
import JobItem from '@/components/job-item';
import { title } from '@/components/primitives';
import jobService from '@/services/job.service';
import { Button, Link } from '@nextui-org/react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

export default async function UrlPage() {
	const search = useSearchParams();

	const url = search.get('to')!;

	try {
		const jobs = await jobService.getAllJobs();

		return (
			<>
				<div className='w-[480px] max-w-[95%] mx-auto p-4 my-4 flex flex-col items-center'>
					<h2 className='font-bold text-xl mb-4  text-center'>
						Bạn đang truy cập liên kết bên ngoài <br /> Job Connect!
					</h2>

					<Link href={url} className='mb-4 text-center'>
						{url}
					</Link>

					<Link href={url} className='mb-4'>
						<Button color='primary'>Tiếp tục chuyển hướng</Button>
					</Link>

					<p className='text-center text-xs italic'>
						*Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào có trên trang web này.
					</p>
				</div>

				<div className='w-[1280px] max-w-[95%] mx-auto'>
					<h2 className={clsx(title({ color: 'blue', size: 'sm' }), 'flex my-4 items-center gap-2')}>
						<span className='flex-1'>
							Khám phá việc làm tại Job Connect
							<i className='bx bx-briefcase text-2xl ml-2'></i>
						</span>

						<Link href='/jobs'>
							<Button
								variant='flat'
								color='primary'
								endContent={<i className='bx bx-right-arrow-alt'></i>}
								size='sm'
							>
								Xem thêm
							</Button>
						</Link>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						{jobs.content.map((job) => (
							<JobItem job={job} key={job.id} />
						))}
					</div>
				</div>
			</>
		);
	} catch (error: any) {
		return <ErrorMessage message={error.message} />;
	}
}
