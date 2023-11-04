'use client';
import ai from '@/assets/lotties/AI.json';
import { title } from '@/components/primitives';
import ListJob from '@/components/recommended-jobs/listJobs';
import SelectResume from '@/components/recommended-jobs/selectResume';
import { Resume } from '@/models/Resume';
import resumeService from '@/services/resume.service';
import clsx from 'clsx';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Lottie } from './index';
function Page() {
	const [selectedResume, setSelectedResume] = useState<number>();

	const { data: resumeList, isLoading } = useQuery(['my-resumes'], () => resumeService.getAllMyResumes(), {
		initialData: [],
	});

	return (
		<>
			<div className='w-full bg-gradient-to-b from-blue-600 to-blue-400'>
				<div className='grid grid-cols-12 container w-[95%] max-w-[1280px] mx-auto mt-10'>
					<div className='col-span-4'>
						<Lottie animationData={ai} />
					</div>
					<div className='col-span-8'>
						<h1 className={clsx(title({ color: 'cyan' }))}>Đề Xuất Công Việc Phù Hợp Nhất Cho Bạn!</h1>
						<p className='text-xl text-white italic mt-5'>
							Kết nối bạn với những công việc phù hợp nhất với năng lực của bạn. Dựa theo kĩ năng, công
							nghệ và những định hướng nghề nghiệp, hệ thống sẽ đề xuất những vị trí liên quan!
						</p>
					</div>
				</div>
			</div>
			<div className='container max-w-[95%] w-[1280px] mx-auto my-5'>
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-4'>
						<SelectResume
							resumes={resumeList as Resume[]}
							setSelectedResume={setSelectedResume}
							selectedResume={selectedResume}
						/>
					</div>
					<div className='col-span-8'>
						<ListJob resumeId={selectedResume} />
					</div>
				</div>
			</div>
		</>
	);
}
export default Page;
