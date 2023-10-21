'use client';
import empty from '@/assets/lotties/empty.json';
import jobDetail from '@/assets/lotties/job-detail.json';
import { Job } from '@/models/Job';
import { formatVndMoney } from '@/utils/common';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card, CardBody, Chip, Divider, Tab, Tabs } from '@nextui-org/react';
import Lottie from 'lottie-react';
interface JobDescriptionProps {
	job: Job;
}
export default function JobDescription({ job }: JobDescriptionProps) {
	const [autoAnimateParent] = useAutoAnimate();
	const mockedSkills = [
		{
			id: 1,
			name: 'ReactJS',
		},
		{
			id: 2,
			name: 'NextJS',
		},
		{
			id: 3,
			name: 'Spring Boot',
		},
		{
			id: 4,
			name: 'NodeJS',
		},
		{
			id: 5,
			name: 'React Native',
		},
	];
	return (
		<Card>
			<CardBody>
				<div ref={autoAnimateParent}>
					<Tabs fullWidth>
						<Tab title='Mô tả công việc' key='job-description-tab'>
							<div>
								<div>
									<h1 className='font-bold text-2xl'>Trách nhiệm công việc</h1>
									<p className='my-5'>{job.description}</p>
								</div>
								<Divider />
								<div className='mt-5'>
									<h1 className='font-bold text-2xl'>Kỹ năng và chuyên môn</h1>
									<p className='italic mt-5'>
										Tối thiểu{' '}
										<Chip
											variant='shadow'
											classNames={{
												base: 'bg-gradient-to-br from-[#47a6f2] to-pink-500 border-small border-white/50 shadow-pink-500/30 p-2 mx-2 text-lg',
												content: 'drop-shadow shadow-black text-white',
											}}
										>
											{job.minExp} năm
										</Chip>
										kinh nghiệm trong lĩnh vực
									</p>
									<div className='my-5'>
										{job.skills.length > 0 ? (
											<div className='flex gap-2'>
												{job.skills.map((skill, index) => (
													<Chip key={skill.id} color='warning' variant='dot' size='lg'>
														{skill.name}
													</Chip>
												))}
											</div>
										) : (
											<div className='flex justify-center flex-col items-center'>
												<Lottie animationData={empty} className='w-[200px]' />
												Công ty chưa bổ sung kĩ năng yêu cầu
											</div>
										)}
									</div>
								</div>
								<Divider />
								<div className='my-5'>
									<h1 className='font-bold text-2xl'>
										Thông tin khác
										<i className='bx bx-info-circle mx-2'></i>
									</h1>
									<div className='grid grid-cols-12'>
										<div className='col-span-6'>
											<ul className='my-5'>
												<li className='my-2'>
													<span className='italic text-lg text-blue-400 font-bold'>
														Mức lương, thưởng:{' '}
													</span>
													<span className='ml-5'>
														{formatVndMoney(job.minSalary)} -{' '}
														{formatVndMoney(job.maxSalary)}
													</span>
												</li>
												<li className='my-2'>
													<span className='italic text-lg text-blue-400 font-bold'>
														Hình thức:{' '}
													</span>
													<span className='ml-5'>{job.workType.name}</span>
												</li>
											</ul>
										</div>
										<div className='col-span-6 mx-auto'>
											<Lottie animationData={jobDetail} className='w-[250px]' />
										</div>
									</div>
								</div>
							</div>
						</Tab>
						<Tab title='Giới thiệu về công ty' key='company-introduction-tab'>
							<div>
								<div className='my-5'>
									<h1 className='font-bold text-2xl'>{job.company.name}</h1>
									<h2 className='italic text-end'>
										<i className='bx bx-location-plus mr-2'></i>
										{job.company.address}
									</h2>
									<p>{job.company.description}</p>
								</div>
								<Divider />
								<div className='my-5'>
									<div className='grid grid-cols-12'>
										<div className='col-span-6'></div>
									</div>
								</div>
								<Divider />
							</div>
						</Tab>
					</Tabs>
				</div>
			</CardBody>
		</Card>
	);
}
