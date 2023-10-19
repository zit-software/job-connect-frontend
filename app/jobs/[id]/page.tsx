'use client';
import jobDetail from '@/assets/lotties/job-detail.json';
import Lottie from 'lottie-react';
interface JobDetailProps {}
async function JobDetail() {
	return (
		<div className='container max-w-[1440px] mx-auto my-5'>
			<div className='grid grid-cols-12'>
				<div className='col-span-12 rounded-2xl'></div>
				<Lottie animationData={jobDetail} className='w-full' />
			</div>
		</div>
	);
}
export default JobDetail;
