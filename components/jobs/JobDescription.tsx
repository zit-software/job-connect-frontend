'use client';
import empty from '@/assets/lotties/empty.json';
import { Job } from '@/models/Job';
import { Card, CardBody, Chip, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { title } from '../primitives';

interface JobDescriptionProps {
	job: Job;
}

export default function JobDescription({ job }: JobDescriptionProps) {
	return (
		<Card className='shadow-none border'>
			<CardBody>
				<div>
					<Tabs color='primary' variant='underlined'>
						<Tab
							title={
								<div className='flex items-center gap-1 -mx-2'>
									<i className='bx bx-briefcase'></i>
									<span>Mô tả công việc</span>
								</div>
							}
							key='job-description-tab'
						>
							<div>
								<div>
									<h3 className='font-bold text-xl my-2'>Nội dung công việc</h3>

									<div
										className='ck-content'
										dangerouslySetInnerHTML={{ __html: job.description }}
									></div>
								</div>

								<div className='mt-2'>
									<h3 className='font-bold text-xl my-2'>Kinh nghiệm</h3>

									<p className='italic text-lg'>
										Tối thiểu{' '}
										<span className={clsx(title({ color: 'blue', size: 'unset' }), '!text-lg')}>
											{job.minExp} năm
										</span>{' '}
										kinh nghiệm trong lĩnh vực.
									</p>
								</div>

								<div className='mt-2'>
									<h3 className='font-bold text-xl my-2'>Kỹ năng</h3>

									<div className='my-5'>
										{job.skills.length > 0 ? (
											<div className='flex gap-2'>
												{job.skills.map((skill) => (
													<Chip key={skill.id} color='primary' variant='flat' size='sm'>
														{skill.name}
													</Chip>
												))}
											</div>
										) : (
											<div className='flex justify-center flex-col items-center'>
												<Lottie animationData={empty} className='w-[200px]' />
												<p>Công ty chưa bổ sung kĩ năng yêu cầu</p>
											</div>
										)}
									</div>
								</div>

								<div className='mt-2'>
									<h3 className='font-bold text-xl'>Hình thức</h3>

									<div className='my-5'>
										<Chip
											color='primary'
											variant='flat'
											className='pl-3'
											startContent={<i className='bx bx-briefcase'></i>}
										>
											{job.workType.name}
										</Chip>
									</div>
								</div>
							</div>
						</Tab>

						<Tab
							title={
								<div className='flex items-center gap-1'>
									<i className='bx bx-building'></i>
									<span>Giới thiệu công ty</span>
								</div>
							}
							key='company-introduction-tab'
						>
							<div>
								<div className='my-5'>
									<h3 className='font-bold text-2xl'>{job.company.name}</h3>

									<Chip
										color='primary'
										startContent={<i className='bx bx-navigation'></i>}
										className='float-right pl-3'
									>
										{job.company.address}
									</Chip>
								</div>

								<div>{job.company.description}</div>

								<div className='my-5'>
									<div className='grid grid-cols-12'>
										<div className='col-span-6'></div>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</CardBody>
		</Card>
	);
}
