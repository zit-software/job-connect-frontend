'use client';

import FileList from '@/components/file-list';
import UploadFileModal from '@/components/upload-file-modal';
import { FileModel } from '@/models/File';
import fileService from '@/services/file.service';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MyFilesPage() {
	const { data: fileList, isLoading } = useQuery(['my-files'], () => fileService.getAllFiles());

	const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

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
					<FileList files={fileList as unknown as FileModel[]} isLoading={isLoading} />
				</div>
			</div>

			<UploadFileModal isOpen={isOpenUploadModal} onClose={handleCloseUploadModal} />
		</>
	);
}
