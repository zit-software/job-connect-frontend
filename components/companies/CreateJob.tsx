'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import CreateJobModal from '../company/CreateJobModal';

interface CreateJobProps {
	id: number;
}

export default function CreateJob({ id }: CreateJobProps) {
	const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen} color='primary'>
				Tạo công việc
			</Button>
			<CreateJobModal companyId={id} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
		</>
	);
}
