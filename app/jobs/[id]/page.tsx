/* eslint-disable @next/next/no-img-element */
import empty from '@/assets/lotties/empty.json';
import Action from '@/components/jobs/Action';
import JobDescription from '@/components/jobs/JobDescription';
import { CompanySize } from '@/constant';
import { Job } from '@/models/Job';
import fileService from '@/services/file.service';
import jobService from '@/services/job.service';
import { formatVndMoney } from '@/utils/common';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import { Lottie } from '.';

export interface JobDetailProps {}

async function JobDetail({ params }: any) {
	try {
		const job: Job = await jobService.getJobById(params.id);

		return (
			<>
				<div className=' bg-gradient-to-b from-[#47a6f2] to-[#4766ef] w-full flex justify-center py-10'>
					<div className='w-[1280px] max-w-[95%] mx-auto'>
						<div className='gap-5 grid grid-cols-3'>
							<div className='col-span-2'>
								<h2 className='text-4xl text-white font-bold mb-5'>{job?.title}</h2>

								<div className='grid grid-cols-3 gap-4 my-4'>
									<div className='flex items-center gap-4 text-lg text-white col-span-1'>
										<div className='w-16 aspect-square bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-full flex items-center justify-center'>
											<i className='bx bx-navigation text-white text-3xl'></i>
										</div>
										<div>
											<h4>Địa điểm</h4>
											<strong>{job.address}</strong>
										</div>
									</div>

									<div className='flex items-center gap-4 text-lg text-white col-span-1'>
										<div className='w-16 aspect-square bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-full flex items-center justify-center'>
											<i className='bx bx-dollar-circle text-white text-3xl'></i>
										</div>
										<div>
											<h4>Mức lương</h4>
											<strong>
												{formatVndMoney(job.minSalary)} - {formatVndMoney(job.maxSalary)}
											</strong>
										</div>
									</div>

									<div className='flex items-center gap-4 text-lg text-white col-span-1'>
										<div className='w-16 aspect-square bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-full flex items-center justify-center'>
											<i className='bx bx-hourglass text-white text-3xl'></i>
										</div>

										<div>
											<h4>Kinh nghiệm</h4>
											<strong>{job.minExp} năm</strong>
										</div>
									</div>
								</div>
							</div>

							<div className='col-span-1 bg-background rounded-xl border overflow-hidden'>
								<Link
									href={`/companies/${job.company.id}`}
									className='flex gap-4 p-4 bg-no-repeat bg-cover bg-center'
								>
									<img
										src={fileService.getFileUrl(job.company.image)}
										alt={job.company.name}
										className='w-24 rounded-lg'
									/>

									<h3 className='flex-1 font-bold text-lg'>{job.company.name}</h3>
								</Link>

								<table className='m-4'>
									<tbody>
										<tr>
											<td>
												<Chip
													variant='light'
													classNames={{
														content: 'font-semibold text-gray-500',
													}}
													startContent={<i className='bx bxs-group text-gray-500'></i>}
												>
													Quy mô:
												</Chip>
											</td>

											<td>
												{CompanySize[job.company.companySize as keyof typeof CompanySize]} nhân
												viên
											</td>
										</tr>

										<tr>
											<td>
												<Chip
													variant='light'
													classNames={{
														content: 'font-semibold text-gray-500',
													}}
													startContent={<i className='bx bxs-navigation text-gray-500'></i>}
												>
													Địa chỉ:
												</Chip>
											</td>

											<td>{job.company.address}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className='container max-w-[1280px] mx-auto my-5'>
					<div className='grid grid-cols-12 gap-5'>
						<div className='col-span-9'>
							<JobDescription job={job} />
						</div>
						<div className='col-span-3'>
							<Action job={job} />
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
