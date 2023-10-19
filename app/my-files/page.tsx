'use client';

import emptyLottie from '@/assets/lotties/empty.json';
import FileItem from '@/components/file-item';
import UploadFileModal from '@/components/upload-file-modal';
import fileService from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button } from '@nextui-org/react';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MyFilesPage() {
	const { data: fileList } = useQuery(['my-files'], () => fileService.getAllFiles());

	const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

	const [fileListParent] = useAutoAnimate();

	const handleOpenUploadModal = () => setIsOpenUploadModal(true);
	const handleCloseUploadModal = () => setIsOpenUploadModal(false);

	return (
		<>
			<div className='w-[1280px] max-w-[95%] mx-auto'>
				<h2 className='text-2xl font-bold my-4 flex gap-2 items-center'>
					<span className='flex-1'>Quản lý file</span>

					<Button startContent={<i className='bx bx-cloud-upload'></i>} onClick={handleOpenUploadModal}>
						Tải lên
					</Button>
				</h2>

				<div className='w-full aspect-[16/9] bg-background rounded-xl border p-4'>
					{fileList?.length ? (
						<div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6' ref={fileListParent}>
							{fileList.map((file) => (
								<FileItem key={file.id} file={file} />
							))}
						</div>
					) : (
						<Lottie animationData={emptyLottie} className='w-96 aspect-square m-auto' />
					)}
				</div>
			</div>

			<UploadFileModal isOpen={isOpenUploadModal} onClose={handleCloseUploadModal} />
		</>
	);
}
