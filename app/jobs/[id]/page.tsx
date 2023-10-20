import { Job } from '@/models/Job';
import jobService from '@/services/job.service';
import Image from 'next/image';
interface JobDetailProps {}
async function JobDetail({ params }: any) {
	try {
		const job: Job = await jobService.getJobById(params.id);
		return (
			<div className='container max-w-[1440px] mx-auto my-5'>
				<div className='grid grid-cols-12 bg-gradient-to-l from-indigo-500 to-blue-400 rounded-2xl w-full p-10'>
					<div className='col-span-8 rounded-2xl'>
						<h1 className='text-4xl text-white'>{job?.title}</h1>
					</div>
					<div className='col-span-4'></div>
				</div>
			</div>
		);
	} catch (error: any) {
		return (
			<div className='flex justify-center items-center flex-col mt-5'>
				<h1 className='text-center text-3xl'>{error.message}</h1>
				<Image loading='lazy' src={require('@/assets/images/error.gif')} alt='error' />
			</div>
		);
	}
}
export default JobDetail;
