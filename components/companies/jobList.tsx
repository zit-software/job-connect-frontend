'use client';

import { Job } from '@/models/Job';
import { queryClient } from '@/providers/QueryClientProvider';
import jobService from '@/services/job.service';
import { formatLongText, removeHtmlTag as removeHtmlTags } from '@/utils/common';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface JobListProps {
	jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
	const handleDeleteJob = async (job: Job) => {
		try {
			await jobService.deleteById(job.id);
			queryClient.setQueryData(
				['jobs', 'companyId', job.company.id],
				(oldData: any) => oldData?.filter((e: Job) => e.id !== job.id) || [],
			);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<Table aria-label='Job list'>
			<TableHeader>
				<TableColumn>Công việc</TableColumn>
				<TableColumn>Mô tả</TableColumn>
				<TableColumn>Mô hình</TableColumn>
				<TableColumn>Ngày đăng</TableColumn>
				<TableColumn>{''}</TableColumn>
			</TableHeader>
			<TableBody>
				{jobs.map((job) => (
					<TableRow key={job.id}>
						<TableCell className='font-bold'>{job.title}</TableCell>

						<TableCell>{formatLongText(removeHtmlTags(job.description))}</TableCell>

						<TableCell>{job.workType.name}</TableCell>
						<TableCell>{dayjs(job.createdAt).format('DD/MM/YYYY - hh:mm')}</TableCell>
						<TableCell>
							<div className='flex gap-2'>
								<Link href={`/jobs/${job.id}/update`}>
									<Button isIconOnly color='primary' variant='flat'>
										<i className='bx bx-edit'></i>
									</Button>
								</Link>

								<Link href={`/jobs/${job.id}`}>
									<Button isIconOnly color='success' variant='flat'>
										<i className='bx bx-globe'></i>
									</Button>
								</Link>

								<Dropdown>
									<DropdownTrigger>
										<Button color='danger' isIconOnly variant='flat'>
											<i className='bx bx-trash'></i>
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label='Delete job'>
										<DropdownItem
											color='danger'
											startContent={<i className='bx bx-trash'></i>}
											onClick={() => handleDeleteJob(job)}
										>
											Xóa
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
