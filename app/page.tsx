'use client';

import JobCard, { JobCardProps } from '@/components/home/jobCard';
import JobItem from '@/components/job-item';
import { mockBanners } from '@/mocks/banners';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { default as NextLink } from 'next/link';
import Carousel from 'react-multi-carousel';

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

const mockedJob: JobCardProps = {
	jobId: 1,
	companyImage: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
	title: 'Lập trình viên Frontend',
	companyName: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
	address: 'TP. Cần Thơ',
	skills: ['NextJS', 'ReactJS', 'TypeScript', 'Java Spring Boot'],
	workType: 'Fulltime',
	minSalary: 10000000,
	maxSalary: 15000000,
};

export default function Home() {
	return (
		<>
			<div className='w-full py-24 bg-gradient-to-tr from-violet-200 to-blue-200'>
				<div className='container mx-auto max-w-[1280px] min-h-64'>
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

			<div className='container mx-auto max-w-[1280px]'>
				<div className='my-5'>
					<h1>
						<span className='text-primary text-3xl font-bold flex-1'>
							Việc làm đã ứng tuyển <i className={clsx('bx bx-file')}></i>
						</span>
					</h1>
					<Carousel
						responsive={responsiveJobCard}
						className='my-4 -mx-2'
						autoPlaySpeed={2500}
						autoPlay
						infinite
					>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
						<div className='px-2'>
							<JobCard {...mockedJob} />
						</div>
					</Carousel>
				</div>
				<h2 className='my-6 flex items-center gap-2'>
					<span className='text-primary text-3xl font-bold flex-1'>
						Việc làm hot <i className={clsx('bx bxs-hot')}></i>
					</span>

					<NextLink href='/hot-jobs' className='text-sm'>
						<Button
							endContent={<i className='bx bx-chevrons-right'></i>}
							size='sm'
							color='primary'
							variant='light'
						>
							Xem thêm
						</Button>
					</NextLink>
				</h2>

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
				</div>
			</div>
		</>
	);
}
