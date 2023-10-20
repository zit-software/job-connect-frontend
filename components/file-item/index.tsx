/* eslint-disable @next/next/no-img-element */
import { FileModel } from '@/models/File';
import { queryClient } from '@/providers/QueryClientProvider';
import fileService from '@/services/file.service';
import { downloadURI } from '@/utils/common';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export type FileItemProps = React.HTMLAttributes<HTMLDivElement> & {
	file: FileModel;
	onSelected?: (file: FileModel) => void;
};

export default function FileItem({ file, onSelected, ...props }: FileItemProps) {
	const { id, name, type, createdAt, user } = file;

	const [isPreview, setIsPreview] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleOpenPreview = () => setIsPreview(true);
	const handleClosePreview = () => setIsPreview(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await fileService.deleteFileById(id);

			queryClient.setQueryData<FileModel[]>(['my-files'], (old: any) =>
				old.filter((file: FileModel) => file.id !== id),
			);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<div
				className='bg-gray-100 border rounded-lg cursor-pointer overflow-hidden shadow flex flex-col'
				{...props}
				onClick={handleOpenPreview}
			>
				<div className='w-full mx-auto flex-1'>
					{type === 'IMAGE' ? (
						<>
							<img
								src={fileService.getFileUrl(id)}
								alt={name}
								className='w-full object-cover aspect-square'
								loading='lazy'
							/>
						</>
					) : (
						<div className='w-full aspect-square flex items-center justify-center'>
							<i className='bx bxs-file-pdf text-7xl text-red-400'></i>
						</div>
					)}
				</div>

				<div className='flex items-center gap-2 border-t p-4 bg-background'>
					{type === 'IMAGE' ? <i className='bx bx-image'></i> : <i className='bx bxs-file-pdf'></i>}
					<h4 className='whitespace-nowrap flex-1 text-ellipsis overflow-hidden font-bold my-1 text-sm'>
						{name}
					</h4>
				</div>
			</div>

			<Modal isOpen={isPreview} className='w-[600px] max-w-[90%]' onClose={handleClosePreview}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader>{name}</ModalHeader>

							<ModalBody>
								<div className='text-sm'>
									<p>
										<strong>Chủ sở hữu: </strong> {user.fullName}
									</p>

									<p>
										<strong>Tải lên vào: </strong> {dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY')}
									</p>

									<p>
										<strong>Loại: </strong> {type}
									</p>
								</div>

								{type === 'IMAGE' ? (
									<img
										className='w-full aspect-square rounded-xl object-cover border bg-gray-100'
										loading='lazy'
										src={fileService.getFileUrl(id)}
										alt={name}
									/>
								) : (
									<Link href={fileService.getFileUrl(id)} target='_blank' className='w-fit'>
										<Button endContent={<i className='bx bx-window-open'></i>}>Xem</Button>
									</Link>
								)}
							</ModalBody>

							<ModalFooter>
								{onSelected && (
									<Button
										startContent={<i className='bx bx-check'></i>}
										onClick={() => {
											onSelected(file);
											handleClosePreview();
										}}
									>
										Chọn
									</Button>
								)}

								<div className='flex-1'></div>

								<Button
									startContent={<i className='bx bx-download'></i>}
									onClick={() => downloadURI(fileService.getFileUrl(id), name)}
								>
									Tải xuống
								</Button>

								<Dropdown aria-label='Delete'>
									<DropdownTrigger>
										<Button
											endContent={<i className='bx bx-trash'></i>}
											color='danger'
											isLoading={isDeleting}
										>
											Xóa file
										</Button>
									</DropdownTrigger>

									<DropdownMenu aria-label='Delete'>
										<DropdownItem
											startContent={<i className='bx bx-trash'></i>}
											onClick={handleDelete}
										>
											Xóa
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
