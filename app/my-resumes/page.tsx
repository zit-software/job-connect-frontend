'use client';

import emptyLottie from '@/assets/lotties/empty.json';
import resumeLottie from '@/assets/lotties/resume.json';
import CreateResumeModal from '@/components/create-resume-modal';
import { title } from '@/components/primitives';
import { Button, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';

export default function MyResumesPage() {
	const { isOpen: isOpenCreateModal, onClose: onCloseCreateModal, onOpen: onOpenCreateModal } = useDisclosure();

	const router = useRouter();

	return (
		<>
			<div className='w-full py-20 bg-gradient-to-tr from-blue-100 to-violet-200'>
				<div className='w-[1280px] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2'>
					<div className='col-span-1'>
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

				<div className='p-2'>
					<Lottie animationData={emptyLottie} className='w-64 mx-auto' />
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
