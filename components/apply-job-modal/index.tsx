import { Resume } from '@/models/Resume';
import applyService from '@/services/apply.service';
import resumeService from '@/services/resume.service';
import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import CvPreviewer from '../cv-previewer';

export interface ApplyJobModalProps {
	isOpen: boolean;
	jobId: number;
	onClose?: () => void;
}

export default function ApplyJobModal({ isOpen, jobId, onClose }: ApplyJobModalProps) {
	const { data: resumes, isLoading } = useQuery(['my-resumes'], () => resumeService.getAllMyResumes());
	const [selectedResume, setSelectedResume] = useState<Resume | null>();
	const [previewPayload, setPreviewPayload] = useState<Resume | null>();
	const [coverLetter, setCoverLetted] = useState<string>('');

	const handleSubmit = async () => {
		try {
			await applyService.createApplyJob({
				jobId,
				resumeId: selectedResume!.id,
				coverLetter,
			});
			onClose?.();
			toast.success('Bạn đã ứng tuyển thành công');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} size='5xl' onClose={onClose}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader>Ứng tuyển</ModalHeader>
							<ModalBody>
								{isLoading && <Spinner />}
								{resumes && (
									<Table color='primary' aria-label='Your resumes'>
										<TableHeader>
											<TableColumn>Chọn</TableColumn>
											<TableColumn>Tên CV</TableColumn>
											<TableColumn>{''}</TableColumn>
										</TableHeader>
										<TableBody>
											{resumes.map((resume) => (
												<TableRow key={resume.id}>
													<TableCell>
														<Checkbox
															isSelected={selectedResume?.id === resume.id}
															onClick={() => setSelectedResume(resume)}
														/>
													</TableCell>
													<TableCell>{resume.jobTitle}</TableCell>
													<TableCell>
														<Button
															size='sm'
															color='primary'
															startContent={<i className='bx bx-zoom-in'></i>}
															onClick={() => setPreviewPayload(resume)}
														>
															Xem trước
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}

								<Textarea
									label='Thư xin việc'
									placeholder='Thư xin việc gửi tới nhà tuyển dụng'
									value={coverLetter}
									onValueChange={(value) => setCoverLetted(value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='primary' isDisabled={!selectedResume} onClick={handleSubmit}>
									Ứng tuyển
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			<CvPreviewer isOpen={!!previewPayload} resume={previewPayload!} onClose={() => setPreviewPayload(null)} />
		</>
	);
}
