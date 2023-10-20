import { FileModel } from '@/models/File';
import fileService from '@/services/file.service';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FileList from '../file-list';
import UploadFileModal from '../upload-file-modal';

export interface SelectFileModalProps {
	isOpen: boolean;
	onClose?: () => void;
	onSelected?: (file: FileModel) => void;
}

export default function SelectFileModal({ isOpen, onClose, onSelected }: SelectFileModalProps) {
	const { data: files, isLoading } = useQuery(['my-files'], () => fileService.getAllFiles());

	const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);

	const handleOpenUploadFileModal = () => setIsOpenUploadFileModal(true);
	const handleCloseUploadFileModal = () => setIsOpenUploadFileModal(false);

	return (
		<>
			<Modal className='w-[960px] max-w-[95%] min-h-[70vh]' placement='top' isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='border-b'>Trình quản lý file</ModalHeader>

							<ModalBody>
								<div>
									<Button
										startContent={<i className='bx bx-cloud-upload'></i>}
										onClick={handleOpenUploadFileModal}
									>
										Tải lên
									</Button>
								</div>
								<div>
									<FileList
										files={files as unknown as FileModel[]}
										isLoading={isLoading}
										onSelected={onSelected}
									/>
								</div>
							</ModalBody>

							<ModalFooter></ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			<UploadFileModal isOpen={isOpenUploadFileModal} onClose={handleCloseUploadFileModal} />
		</>
	);
}
