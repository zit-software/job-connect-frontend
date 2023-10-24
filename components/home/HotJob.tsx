import { Job } from '@/models/Job';
import fileService from '@/services/file.service';
import { formatVndMoney } from '@/utils/common';
import { Card, CardBody, CardHeader, Chip, Image } from '@nextui-org/react';
import Link from 'next/link';
export interface JobCardProps {
	job: Job;
}
function HotJob({ job }: JobCardProps) {
	return (
		<>
			<Link
				href={`/jobs/${job.id}`}
				className='p-2 bg-gradient-to-tr from-red-500 to-orange-400 block rounded-2xl relative hover:shadow-2xl hover:shadow-orange-200 '
			>
				<div className='w-10 h-full bg-white absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-25 skew-x-12'></div>

				<div className='w-5 h-full bg-white absolute left-1/3 top-0 -translate-x-1/2 bg-opacity-25 skew-x-12'></div>

				<Card className='px-2 shadow-none border-none flex flex-col' style={{ aspectRatio: 16 / 11 }}>
					<CardHeader className='flex gap-5 border-b h-24 overflow-hidden'>
						<Image
							alt={job.company.name}
							height={40}
							radius='sm'
							width={40}
							className='border'
							src={fileService.getFileUrl(job.company.image)}
						/>
						<div className='flex flex-col flex-1 overflow-hidden'>
							<h2 className='text-md font-bold text-orange-500 mb-2 whitespace-nowrap text-ellipsis overflow-hidden'>
								<Chip
									classNames={{
										content: 'text-white font-bold',
									}}
									color='warning'
									size='sm'
									className='mr-2'
								>
									{job.workType.name}
								</Chip>
								{job.title}
							</h2>
							<p className='text-small text-default-500 text-ellipsis whitespace-nowrap overflow-hidden'>
								{job.company.name}
							</p>
						</div>
					</CardHeader>

					<CardBody className='flex-1'>
						<div className='flex flex-wrap gap-1'>
							{job.skills.map((skill, index) => (
								<Chip key={index} variant='flat' color='warning' size='sm'>
									{skill.name}
								</Chip>
							))}
						</div>

						<div className='mt-2'>
							<table>
								<tbody>
									<tr>
										<td>
											<Chip
												variant='light'
												color='warning'
												classNames={{
													content: 'font-bold',
												}}
												startContent={<i className='bx bxs-dollar-circle'></i>}
											>
												Mức lương
											</Chip>
										</td>
										<td className='font-semibold text-sm'>
											{formatVndMoney(job.minSalary)} - {formatVndMoney(job.maxSalary)}
										</td>
									</tr>

									<tr>
										<td>
											<Chip
												variant='light'
												color='warning'
												classNames={{
													content: 'font-bold',
												}}
												startContent={<i className='bx bxs-navigation'></i>}
											>
												Địa điểm
											</Chip>
										</td>
										<td className='font-semibold text-sm'>{job.address}</td>
									</tr>

									<tr>
										<td>
											<Chip
												variant='light'
												color='warning'
												classNames={{
													content: 'font-bold',
												}}
												startContent={<i className='bx bxs-user'></i>}
											>
												Kinh nghiệm
											</Chip>
										</td>
										<td className='font-semibold text-sm'>{job.minExp} năm</td>
									</tr>
								</tbody>
							</table>
						</div>
					</CardBody>
				</Card>
			</Link>
		</>
	);
}

export default HotJob;
