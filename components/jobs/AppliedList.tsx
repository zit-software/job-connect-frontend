import { Job } from '@/models/Job';
import { JobApplyStatus } from '@/models/JobApply';
import { Resume } from '@/models/Resume';
import fileService from '@/services/file.service';
import jobService from '@/services/job.service';
import {
	Avatar,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import PageLoading from '../PageLoader';
import CvPreviewer from '../cv-previewer';

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

export interface AppliedListProps {
	job: Job;
}

export default function AppliedList({ job }: AppliedListProps) {
	const { data: appliedList, isLoading } = useQuery(['applied-list', { jobId: job.id }], () =>
		jobService.getAppliedByJobId(job.id),
	);
	const [previewPayload, setPreviewPayload] = useState<Resume | null>();

	if (isLoading) return <PageLoading />;

	return (
		<>
			<Table>
				<TableHeader>
					<TableColumn>Ứng viên</TableColumn>
					<TableColumn>Thư xin việc</TableColumn>
					<TableColumn>Trạng thái</TableColumn>
					<TableColumn>Thời gian ứng tuyển</TableColumn>
					<TableColumn>Hành động</TableColumn>
				</TableHeader>

				<TableBody>
					{appliedList!.map((applied) => (
						<TableRow key={applied.id}>
							<TableCell>
								<Chip avatar={<Avatar src={fileService.getFileUrl(applied.user.image)} />}>
									{applied.user.fullName}
								</Chip>
							</TableCell>
							<TableCell>{applied.coverLetter}</TableCell>
							<TableCell>
								<Status status={applied.status} />
							</TableCell>
							<TableCell>{dayjs(applied.createdAt).format('HH:mm, DD/MM/YYYY')}</TableCell>
							<TableCell>
								<Button
									size='sm'
									color='primary'
									startContent={<i className='bx bx-file'></i>}
									onClick={() => setPreviewPayload(applied.resume)}
								>
									Xem CV
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<CvPreviewer
				isOpen={!!previewPayload}
				actions={
					<>
						<Button color='success' variant='bordered' startContent={<i className='bx bx-check'></i>}>
							Chấp nhận
						</Button>
						<Button color='danger' variant='bordered' startContent={<i className='bx bx-x'></i>}>
							Từ chối
						</Button>
					</>
				}
				resume={previewPayload!}
				onClose={() => setPreviewPayload(null)}
			/>
		</>
	);
}
