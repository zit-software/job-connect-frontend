'use client';

import { Job } from '@/models/Job';
import { formatLongText } from '@/utils/common';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
interface JobListProps {
	jobs: Job[];
}
export default function JobList({ jobs }: JobListProps) {
	return (
		<Table aria-label='Example static collection table'>
			<TableHeader>
				<TableColumn>Công việc</TableColumn>
				<TableColumn>Mô tả</TableColumn>
				<TableColumn>Mô hình</TableColumn>
				<TableColumn>Ngày đăng</TableColumn>
				<TableColumn>Hành động</TableColumn>
			</TableHeader>
			<TableBody>
				{jobs.map((job) => (
					<TableRow key={job.id}>
						<TableCell>{job.title}</TableCell>
						<TableCell>{formatLongText(job.description)}</TableCell>
						<TableCell>{job.workType.name}</TableCell>
						<TableCell>{dayjs(job.createdAt).format('DD/MM/YYYY - hh:mm')}</TableCell>
						<TableCell>
							<div className='flex gap-2'>
								<Link href={`/jobs/${job.id}/edit`}>
									<Button isIconOnly>
										<i className='bx bx-edit'></i>
									</Button>
								</Link>

								<Link href={`/jobs/${job.id}`}>
									<Button isIconOnly>
										<i className='bx bx-globe'></i>
									</Button>
								</Link>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
