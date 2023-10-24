'use client';

import PageLoading from '@/components/PageLoader';
import HotJob from '@/components/home/HotJob';
import JobItem from '@/components/job-item';
import { title } from '@/components/primitives';
import { mockBanners } from '@/mocks/banners';
import jobService from '@/services/job.service';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { default as NextLink } from 'next/link';
import Carousel from 'react-multi-carousel';
import { useQuery } from 'react-query';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const responsiveJobCard = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 4,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
	},
};

export default function Home() {
	const { data: jobs, isLoading } = useQuery(['jobs'], () => jobService.getAllJobs());

	return (
		<>
			<div className='w-full py-24 bg-gradient-to-tr from-violet-200 to-blue-200 relative overflow-clip'>
				<div className='w-64 h-64 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full blur-md'></div>
				<div className='w-32 h-32 absolute top-32 left-64 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full blur-sm'></div>
				<div className='w-48 h-48 absolute bottom-32 right-64 translate-x-1/2 translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full blur-sm'></div>
				<div className='w-96 h-96 absolute bottom-0 right-10 translate-x-1/2 translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full blur-sm'></div>

				<div className='w-48 h-48 absolute bottom-0 left-64 -translate-x-1/2 translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full p-1 blur-sm'>
					<div className='bg-violet-200 w-full h-full rounded-full'></div>
				</div>

				<div className='w-48 h-48 absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-blue-500 to-green-400 rounded-full p-1 blur-sm'>
					<div className='bg-blue-200 w-full h-full rounded-full'></div>
				</div>

				<div className='container mx-auto w-[1280px] max-w[95%] min-h-64'>
					<Carousel responsive={responsive} autoPlaySpeed={2500} autoPlay infinite>
						{mockBanners.map((banner) => (
							<a
								href={banner.href}
								target='_blank'
								key={banner.id}
								className='block h-64 bg-cover bg-center bg-no-repeat rounded-xl'
								style={{
									backgroundImage: `url(${banner.image})`,
								}}
							></a>
						))}
					</Carousel>
				</div>
			</div>

			<div className='container mx-auto w-[1280px] max-w[95%]'>
				<div className='my-5'>
					<h2 className='my-6 flex items-center gap-2'>
						<span className={clsx(title({ color: 'orange', size: 'sm' }), 'flex-1')}>
							Việc làm hot <i className={clsx('bx bxs-hot')}></i>
						</span>

						<NextLink href='/hot-jobs' className='text-sm'>
							<Button
								endContent={<i className='bx bx-chevrons-right'></i>}
								size='sm'
								color='warning'
								variant='light'
								className='font-bold'
							>
								Xem thêm
							</Button>
						</NextLink>
					</h2>

					{isLoading ? (
						<PageLoading />
					) : (
						<Carousel
							responsive={responsiveJobCard}
							className='my-4 -mx-2 gap-2 overflow-y-visible'
							autoPlaySpeed={2500}
							autoPlay
							infinite
						>
							{jobs?.content.map((job) => (
								<div key={job.id} className='px-2 pb-12'>
									<HotJob job={job} />
								</div>
							))}
						</Carousel>
					)}
				</div>
				<h2 className='my-6 flex items-center gap-2'>
					<span className={clsx(title({ color: 'blue', size: 'sm' }), 'flex-1')}>
						Việc làm mới <i className={clsx('bx bx-briefcase')}></i>
					</span>

					<NextLink href='/jobs' className='text-sm'>
						<Button
							endContent={<i className='bx bx-chevrons-right'></i>}
							size='sm'
							color='primary'
							variant='light'
							className='font-bold'
						>
							Xem thêm
						</Button>
					</NextLink>
				</h2>

				{isLoading && <PageLoading />}

				<div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
					{jobs?.content.map((job) => <JobItem key={job.id} job={job} />)}
				</div>
			</div>
		</>
	);
}
