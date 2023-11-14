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

					<Link href={`/companies/${job.company.id}`} className='block my-1'>
						<Button
							fullWidth
							color='primary'
							variant='flat'
							startContent={<i className='bx bx-building'></i>}
						>
							Xem công ty
						</Button>
					</Link>

					{user?.userRole === UserUserRole.APPLICANT && (
						<Link href={`/my-resumes?create=true`} className='block my-1'>
							<Button
								fullWidth
								color='warning'
								variant='flat'
								startContent={<i className='bx bxs-file-plus'></i>}
							>
								Tạo cv ngay
							</Button>
						</Link>
					)}
				</CardBody>
			</Card>

			<ApplyJobModal isOpen={isOpenApplyModal} jobId={job.id} onClose={onOpenApplyModalChange} />
		</>
	);
}
