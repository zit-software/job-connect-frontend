'use client';
import empty from '@/assets/lotties/empty.json';
import { Job } from '@/models/Job';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card, CardBody, Chip, Divider, Tab, Tabs } from '@nextui-org/react';
import Lottie from 'lottie-react';
interface JobDescriptionProps {
	job: Job;
}
export default function JobDescription({ job }: JobDescriptionProps) {
	const [autoAnimateParent] = useAutoAnimate();
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
									<div className='my-5'>
										{job.skills.length > 0 ? (
											job.skills.map((skill, index) => (
												<Chip key={skill.id} color='success'>
													{skill.name}
												</Chip>
											))
										) : (
											<div className='flex justify-center flex-col items-center'>
												Công ty chưa bổ sung kĩ năng yêu cầu
												<Lottie animationData={empty} className='w-[200px]' />
											</div>
										)}
									</div>
								</div>
							</div>
						</Tab>
						<Tab title='Giới thiệu về công ty' key='company-introduction-tab'>
							<div>
								<h1 className='font-bold text-2xl'>{job.company.name}</h1>
								<h2 className='italic text-end'>
									<i className='bx bx-location-plus mr-2'></i>
									{job.company.address}
								</h2>
								<p className='my-5'>{job.company.description}</p>
								<Divider />
							</div>
						</Tab>
					</Tabs>
				</div>
			</CardBody>
		</Card>
	);
}
