'use client';

import JobCard, { JobCardProps } from '@/components/home/jobCard';
import Carousel from 'react-multi-carousel';

const responsive = {
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
	skills: ['NextJS', 'ReactJS', 'TypeScript'],
	workType: 'Fulltime',
	minSalary: 10000000,
	maxSalary: 15000000,
};

export default function Home() {
	return (
		<div className='container mx-auto max-w-[1280px]'>
			<div className='mt-5'>
				<h1 className='font-bold italic text-3xl'>
					Top việc làm hiện tại
				</h1>
				<Carousel
					responsive={responsive}
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
		</div>
	);
}
