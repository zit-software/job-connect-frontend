'use client';
import PageLoading from '@/components/PageLoader';
import { title } from '@/components/primitives';
import { JobApply, JobApplyStatus } from '@/models/JobApply';
import { queryClient } from '@/providers/QueryClientProvider';
import applyService from '@/services/apply.service';
import fileService from '@/services/file.service';
import {
	Avatar,
	Button,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

interface StatusProps {
	status: JobApplyStatus;
}

function Status({ status }: StatusProps) {
	switch (status) {
		case 'PENDING':
			return (
				<Chip variant='bordered' startContent={<i className='bx bx-time'></i>}>
					Đang đợi xem xét
				</Chip>
			);
		case 'ACCEPTED':
			return (
				<Chip variant='bordered' startContent={<i className='bx bx-check'></i>} color='success'>
					Đã duyệt
				</Chip>
			);
		case 'REJECTED':
			return (
				<Chip variant='bordered' startContent={<i className='bx bx-x'></i>} color='danger'>
					Đã duyệt
				</Chip>
			);
	}

	return <></>;
}

export default function AppliedJobPage() {
	const { data: appliedJobs, isLoading } = useQuery(['applied-jobs'], () => applyService.getAppliedJobs());
	const [removePayload, setRemovePayload] = useState<JobApply | null>();

	const handleRemove = async () => {
		try {
			await applyService.deleteAppliedJob(removePayload!.id);
			queryClient.setQueryData(['applied-jobs'], (oldData: any) => {
				return oldData ? oldData.filter((applied: JobApply) => applied.id !== removePayload!.id) : [];
			});
			toast.success('Đã xóa đơn ứng tuyển');
			setRemovePayload(null);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	if (isLoading) return <PageLoading />;

	return (
		<div className='mx-auto w-[1280px] max-w-[95%] my-4'>
			<h2 className={clsx(title({ color: 'blue', size: 'sm' }), 'pb-4')}>Công việc đã ứng tuyển</h2>

			<Table>
				<TableHeader>
					<TableColumn>Công việc</TableColumn>
					<TableColumn>Công ty</TableColumn>
					<TableColumn>Nhà tuyển dụng</TableColumn>
					<TableColumn>Ngày ứng tuyển</TableColumn>
					<TableColumn>Trạng thái</TableColumn>
					<TableColumn>Hành động</TableColumn>
				</TableHeader>
				<TableBody>
					{appliedJobs!.map((appliedJob) => (
						<TableRow key={appliedJob.id}>
							<TableCell>
								<Button
									href={`/jobs/${appliedJob.job.id}`}
									as={Link}
									color='primary'
									size='sm'
									variant='bordered'
								>
									{appliedJob.job.title}
								</Button>
							</TableCell>
							<TableCell>
								<Chip
									avatar={<Avatar src={fileService.getFileUrl(appliedJob.job.company.image)} />}
									as={Link}
									href={`/companies/${appliedJob.job.company.id}`}
									variant='dot'
								>
									{appliedJob.job.company.name}
								</Chip>
							</TableCell>
							<TableCell>
								<Chip
									avatar={
										<Avatar src={fileService.getFileUrl(appliedJob.job.recruiter.user.image)} />
									}
									variant='dot'
								>
									{appliedJob.job.recruiter.user.fullName}
								</Chip>
							</TableCell>
							<TableCell>{dayjs(appliedJob.createdAt).format('HH:mm, DD/MM/YYYY')}</TableCell>
							<TableCell>
								<Status status={appliedJob.status} />
							</TableCell>
							<TableCell>
								<Button
									color='danger'
									variant='flat'
									size='sm'
									startContent={<i className='bx bx-x'></i>}
									onClick={() => setRemovePayload(appliedJob)}
								>
									Hủy
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Modal isOpen={!!removePayload} onClose={() => setRemovePayload(null)}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Xóa đơn ứng tuyển</ModalHeader>
							<ModalBody>
								<p>
									Bạn chắc là muốn xóa đơn ứng tuyển cho công việc{' '}
									<strong>{removePayload!.job.title}</strong>?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button onClick={onClose}>Hủy</Button>
								<Button color='danger' onClick={handleRemove}>
									Xóa
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
