import { FileModel } from '@/models/File';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

export interface SelectFileModalProps {
	isOpen: boolean;
	onClose?: () => void;
	onSelected?: (file: FileModel) => void;
}

export default function SelectFileModal({ isOpen, onClose, onSelected }: SelectFileModalProps) {
	return (
		<Modal className='w-[960px] max-w-[95%] h-[70vh]' placement='top' isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='border-b'>Trình quản lý file</ModalHeader>

						<ModalBody></ModalBody>

						<ModalFooter></ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
