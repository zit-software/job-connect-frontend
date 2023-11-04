'use client';

import { Resume } from '@/models/Resume';
import { Button, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import CvPreviewer from '../cv-previewer';

interface SelectResumeProps {
	resumes: Resume[];
	setSelectedResume: (key: number) => void;
	selectedResume?: number;
}

export default function SelectResume({ resumes, selectedResume, setSelectedResume }: SelectResumeProps) {
	const selectedKeys = selectedResume ? [String(selectedResume)] : [];
	const { isOpen: isOpenPreviewModal, onOpenChange: onOpenPreviewModalChange } = useDisclosure();

	return (
		<>
			<div>
				<h1 className='text-blue text-2xl font-bold'>Chọn một CV của bạn để gợi ý!</h1>
				<Select
					aria-label='resume-select'
					name='resume'
					variant='underlined'
					startContent={<i className='bx bx-file'></i>}
					selectedKeys={selectedKeys}
					className='my-3'
					onChange={(event) => {
						setSelectedResume(Number(event.target.value));
					}}
					placeholder='Chọn cv tìm việc...'
				>
					{resumes.map((resume) => (
						<SelectItem key={resume.id} value={resume.id} textValue={resume.jobTitle}>
							{resume.jobTitle} # {resume.id}
						</SelectItem>
					))}
				</Select>

				{selectedResume ? <Button onClick={onOpenPreviewModalChange}>Xem trước</Button> : <></>}
			</div>

			{selectedResume ? (
				<CvPreviewer
					resume={resumes.find((resume) => resume.id === selectedResume) as Resume}
					isOpen={isOpenPreviewModal}
					onClose={onOpenPreviewModalChange}
				/>
			) : (
				<></>
			)}
		</>
	);
}
