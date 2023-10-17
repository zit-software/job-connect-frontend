'use client';

import emptyLottie from '@/assets/lotties/empty.json';
import resumeLottie from '@/assets/lotties/resume.json';
import CreateResumeModal from '@/components/create-resume-modal';
import { title } from '@/components/primitives';
import { Resume } from '@/models/Resume';
import { queryClient } from '@/providers/QueryClientProvider';
import resumeService from '@/services/resume.service';
import { Button, Spinner, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function MyResumesPage() {
	const [isDeleting, setIsDeleting] = useState(false);

	const { data: resumeList, isLoading } = useQuery(['my-resumes'], () => resumeService.getAllMyResumes());

	const { isOpen: isOpenCreateModal, onClose: onCloseCreateModal, onOpen: onOpenCreateModal } = useDisclosure();

	const handlDeleteResume = async (resumeId: number) => {
		try {
			setIsDeleting(true);
			await resumeService.deleteResumeById(resumeId);

			queryClient.setQueryData(['my-resumes'], (oldData: any) => {
				return oldData.filter((resume: Resume) => resume.id !== resumeId);
			});
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	const router = useRouter();

	return (
		<>
			<div className='w-full py-20 bg-gradient-to-tr from-blue-100 to-violet-200'>
				<div className='w-[1280px] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2'>
					<div className='col-span-1 aspect-square'>
						<Lottie animationData={resumeLottie} />
					</div>
					<div className='col-span-2'>
						<h2 className={clsx(title({ color: 'violet' }))}>Tạo CV để tìm việc làm</h2>

						<p className='my-4 text-default-600 text-lg text-justify'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nihil possimus cum
							nobis iure, quas ipsum, nesciunt, odit voluptate exercitationem corporis quibusdam quisquam
							debitis veritatis non ratione voluptatem sapiente vel!
						</p>

						<Button
							size='lg'
							color='secondary'
							startContent={<i className='bx bx-pen'></i>}
							onClick={onOpenCreateModal}
						>
							Tạo CV ngay
						</Button>
					</div>
				</div>
			</div>

			<div className='w-[1280px] max-w-[95%] mx-auto bg-background border rounded-xl overflow-hidden -mt-10'>
				<div className='py-2 px-4 bg-violet-400'>
					<h2 className='text-white font-bold text-lg'>Danh sách CV của bạn</h2>
				</div>

				<div>
					{isLoading ? (
						<div className='mx-auto my-10 w-fit'>
							<Spinner />
						</div>
					) : resumeList?.length ? (
						<div className='flex flex-col gap-4 bg-gray-50 p-4'>
							{resumeList.map((resume) => (
								<div
									key={resume.id}
									className='p-2 flex gap-2 items-center bg-background rounded-xl border shadow'
								>
									<i className='bx bx-file text-4xl'></i>

									<div className='flex-1'>
										<h3 className='text-lg font-bold'>{resume.jobTitle}</h3>
										<p>
											<strong>Cập nhật lần cuối: </strong>{' '}
											<i className='text-gray-500'>
												{dayjs(resume.updatedAt).format('HH:mm, DD/MM/YYYY')}
											</i>
										</p>
									</div>

									<Link href={`/my-resumes/${resume.id}/edit`}>
										<Button isIconOnly color='primary'>
											<i className='bx bx-edit-alt text-2xl'></i>
										</Button>
									</Link>

									<Button
										isIconOnly
										color='danger'
										isLoading={isDeleting}
										onClick={() => handlDeleteResume(resume.id)}
									>
										<i className='bx bx-trash text-2xl'></i>
									</Button>
								</div>
							))}
						</div>
					) : (
						<Lottie animationData={emptyLottie} className='w-64 mx-auto' />
					)}
				</div>
			</div>

			<CreateResumeModal
				isOpen={isOpenCreateModal}
				onClose={onCloseCreateModal}
				onCreated={(resume) => router.push(`/my-resumes/${resume.id}/edit`)}
			/>
		</>
	);
}
