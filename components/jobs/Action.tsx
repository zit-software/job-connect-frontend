'use client';

import { Job } from '@/models/Job';
import { UserUserRole } from '@/models/User';
import { RootState } from '@/store';
import { Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import ApplyJobModal from '../apply-job-modal';

export interface ActionProps {
	job: Job;
}

export default function Action({ job }: ActionProps) {
	const user = useSelector((state: RootState) => state.user);
	const { isOpen: isOpenApplyModal, onOpenChange: onOpenApplyModalChange } = useDisclosure();

	return (
		<>
			<Card className='shadow-none border'>
				<CardBody>
					<h3 className='text-lg font-bold mb-2'>Hành động</h3>

					{user?.userRole === UserUserRole.APPLICANT && (
						<Button
							className='my-1 text-white'
							color='success'
							startContent={<i className='bx bxs-send'></i>}
							onClick={onOpenApplyModalChange}
						>
							Ứng tuyển
						</Button>
					)}

					{user?.id === job.recruiter.user.id && (
						<Button
							className='my-1'
							href={`/jobs/${job.id}/update`}
							color='primary'
							startContent={<i className='bx bxs-pencil'></i>}
							as={Link}
						>
							Chỉnh sửa
						</Button>
					)}

					<Button
						href={`/companies/${job.company.id}`}
						className='my-1'
						fullWidth
						color='primary'
						variant='flat'
						startContent={<i className='bx bx-building'></i>}
						as={Link}
					>
						Xem công ty
					</Button>

					{user?.userRole === UserUserRole.APPLICANT && (
						<Button
							href={`/my-resumes?create=true`}
							className='my-1'
							fullWidth
							color='warning'
							variant='flat'
							startContent={<i className='bx bxs-file-plus'></i>}
							as={Link}
						>
							Tạo cv ngay
						</Button>
					)}
				</CardBody>
			</Card>

			<ApplyJobModal isOpen={isOpenApplyModal} jobId={job.id} onClose={onOpenApplyModalChange} />
		</>
	);
}
