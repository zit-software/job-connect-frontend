'use client';

import { Resume } from '@/models/Resume';
import { Select, SelectItem, Selection } from '@nextui-org/react';

interface SelectResumeProps {
	resumes: Resume[];
	setSelectedResume: (keys: Selection) => any;
	selectedResume: Iterable<number>;
}

export default function SelectResume({ resumes, selectedResume, setSelectedResume }: SelectResumeProps) {
	return (
		<div>
			<h1 className='text-blue text-2xl text-center font-bold'>Chọn một CV của bạn để gợi ý!</h1>
			<Select
				aria-label='resume-select'
				name='resume'
				selectedKeys={selectedResume}
				className='mt-5'
				onSelectionChange={setSelectedResume}
				placeholder='Chọn cv tìm việc...'
			>
				{resumes.map((resume) => (
					<SelectItem key={resume.id} value={resume.id} textValue={resume.jobTitle}>
						{resume.jobTitle} # {resume.id}
					</SelectItem>
				))}
			</Select>
		</div>
	);
}
