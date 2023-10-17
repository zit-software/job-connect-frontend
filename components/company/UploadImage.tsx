import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { type } from 'os';
import StyledDropzone from './DropZone';
import { useEffect, useState } from 'react';
interface UploadImageModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	type: string;
	setType: (type: string) => void;
}
function UploadImageModal({ isOpen, onOpenChange, type, setType }: UploadImageModalProps) {
	const [files, setFiles] = useState<File[]>([]);
	const closeModal = (onClose: () => void) => {
		onClose();
		setType('');
		setFiles([]);
	};
	const thumbs = files.map((file: any) => (
		<div key={file.name}>
			<div>
				<img
					src={file.preview}
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
			</div>
		</div>
	));

	useEffect(() => {
		return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
	}, []);
	return (
		<Modal
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
							<StyledDropzone setFiles={setFiles} />
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={() => closeModal(onClose)}>
								Hủy
							</Button>
							<Button color='primary' onPress={() => closeModal(onClose)}>
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
