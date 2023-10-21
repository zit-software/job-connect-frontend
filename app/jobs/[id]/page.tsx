import wave from '@/assets/images/wave.svg';
import empty from '@/assets/lotties/empty.json';
import jobDetail from '@/assets/lotties/job-detail.json';
import Action from '@/components/jobs/action';
import JobDescription from '@/components/jobs/jobDescription';
import { Job } from '@/models/Job';
import fileService from '@/services/file.service';
import jobService from '@/services/job.service';
import { formatVndMoney } from '@/utils/common';
import { Lottie } from '.';
interface JobDetailProps {}
async function JobDetail({ params }: any) {
	try {
		const job: Job = await jobService.getJobById(params.id);
		return (
			<>
				<div className=' bg-gradient-to-b from-[#47a6f2] to-[#4766ef] w-full flex justify-center'>
					<div className='grid grid-cols-12 p-10 max-w-[1280px]'>
						<div className='col-span-8 rounded-2xl'>
							<h1 className='text-4xl text-white font-bold'>{job?.title}</h1>
							<div className='grid grid-cols-12 mt-10'>
								<div className='col-span-4 pr-5'>
									<img
										className='rounded-full w-[250px]'
										src={fileService.getFileUrl(job.company.image)}
										alt={job.company.name}
									/>
								</div>
								<div className='col-span-8'>
									<ul>
										<li>
											<span className='font-bold text-2xl text-white mr-2'>
												<i className='bx bxs-briefcase'></i>
											</span>
											<span className='text-white text-xl'>{job.company.name}</span>
										</li>
										<li className='my-5'>
											<span className='font-bold  text-2xl text-white mr-2'>
												<i className='bx bxs-location-plus'></i>
											</span>
											<span className='text-white text-xl'>{job.address}</span>
										</li>
										<li className='my-5'>
											<span className='font-bold  text-2xl text-white mr-2'>
												<i className='bx bx-desktop'></i>
											</span>
											<span className='text-white text-xl'>{job.minExp}+ năm kinh nghiệm</span>
										</li>
										<li className='my-5'>
											<span className='font-bold text-2xl text-white mr-2'>
												<i className='bx bx-money'></i>
											</span>
											<span className='text-white text-xl'>
												{formatVndMoney(job.minSalary)} - {formatVndMoney(job.maxSalary)}
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='col-span-4 w-[300px] m-auto'>
							<Lottie animationData={jobDetail} />
						</div>
					</div>
				</div>
				<div
					className='w-full'
					style={{
						aspectRatio: 16 / 9,
						backgroundImage: `url(${wave.src})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '320px',
						overflow: 'hidden',
					}}
				></div>
				<div className='container max-w-[1280px] mx-auto my-5'>
					<div className='grid grid-cols-12 gap-5'>
						<div className='col-span-9'>
							<JobDescription job={job} />
						</div>
						<div className='col-span-3'>
							<Action />
						</div>
					</div>
				</div>
			</>
		);
	} catch (error: any) {
		return (
			<div className='flex justify-center items-center flex-col mt-5'>
				<h1 className='text-center text-3xl'>{error.message}</h1>
				<Lottie animationData={empty} />
			</div>
		);
	}
}
export default JobDetail;
