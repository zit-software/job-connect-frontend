/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { updateCompanyImageDTO } from '@/models/Company';
import companyService from '@/services/company.service';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StyledDropzone from './DropZone';
interface UploadImageModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	type: string;
	setType: (type: string) => void;
	companyId: number;
}
function UploadImageModal({ isOpen, onOpenChange, type, setType, companyId }: UploadImageModalProps) {
	const [files, setFiles] = useState<File[]>([]);
	const closeModal = (onClose: () => void) => {
		onClose();
		setType('');
		setFiles([]);
	};
	const thumbs = files.map((file: any) => (
		<div className='w-[1200px] max-w-full' key={file.name}>
			<div>
				<img
					className='object-contain mx-auto'
					src={file.preview}
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
			</div>
		</div>
	));
	const handleUpdateImage = async (updateImageDTO: updateCompanyImageDTO, onClose: () => void) => {
		try {
			switch (type) {
				case 'logo':
					await companyService.updateCompanyLogo(updateImageDTO);
					toast.success('Cập nhật ảnh thành công');
					break;
				case 'banner':
					await companyService.updateCompanyBanner(updateImageDTO);
					toast.success('Cập nhật ảnh thành công');
					break;
			}
			onClose();
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
	}, [files]);
	return (
		<Modal
			size={type === 'logo' ? 'lg' : '3xl'}
			onClose={() => {
				setType('');
				setFiles([]);
			}}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{type === 'logo' ? 'Logo công ty' : 'Banner công ty'}
						</ModalHeader>
						<ModalBody>
							<div>{thumbs}</div>
							<StyledDropzone
								heightClass={type === 'logo' ? 'h-[200px]' : 'h-[300px]'}
								setFiles={setFiles}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={() => closeModal(onClose)}>
								Hủy
							</Button>
							<Button
								color='primary'
								onPress={() => {
									const updateImageDTO: updateCompanyImageDTO = {
										image: files[0],
										companyId,
									};
									handleUpdateImage(updateImageDTO, onClose);
								}}
							>
								Lưu
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
export default UploadImageModal;
