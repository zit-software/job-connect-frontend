/* eslint-disable @next/next/no-img-element */
'use client';

import { Job } from '@/models/Job';
import fileService from '@/services/file.service';
import { formatVndMoney } from '@/utils/common';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

export interface JobItemProps {
	job: Job;
}

export default function JobItem({ job }: JobItemProps) {
	return (
		<Link
			href={`/jobs/${job.id}`}
			className='flex px-4 py-4 gap-4 cursor-pointer bg-background rounded-lg border transition hover:shadow-lg'
		>
			<img
				src={fileService.getFileUrl(job.company.image)}
				alt={job.company.name}
				className='rounded-lg w-24 h-24 border'
			/>

			<div className='flex-1 flex flex-col'>
				<h3 className='font-bold text-large text-default-700'>{job.title}</h3>

				<p className='text-default-600 text-small'>{job.company.name}</p>

				<div className='flex-1'></div>

				<div className='flex gap-2 flex-wrap'>
					<table>
						<tbody>
							<tr>
								<td>
									<Chip
										color='primary'
										variant='light'
										classNames={{ content: 'font-semibold' }}
										startContent={<i className='bx bx-dollar-circle'></i>}
									>
										Mức lương
									</Chip>
								</td>
								<td className='text-sm font-semibold italic text-default-700'>
									{formatVndMoney(job.minSalary)} - {formatVndMoney(job.maxSalary)}
								</td>
							</tr>

							<tr>
								<td>
									<Chip
										color='primary'
										variant='light'
										classNames={{ content: 'font-semibold' }}
										startContent={<i className='bx bx-navigation'></i>}
									>
										Địa điểm làm việc
									</Chip>
								</td>
								<td className='text-sm font-semibold italic text-default-700'>{job.address}</td>
							</tr>

							<tr>
								<td>
									<Chip
										color='primary'
										variant='light'
										classNames={{ content: 'font-semibold' }}
										startContent={<i className='bx bx-building'></i>}
									>
										Hình thức
									</Chip>
								</td>
								<td className='text-sm font-semibold italic text-default-700'>{job.workType.name}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Link>
	);
}
