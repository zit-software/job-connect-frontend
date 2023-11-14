import { Job } from '@/models/Job';
import { Resume } from '@/models/Resume';
import fileService from '@/services/file.service';
import matchingService from '@/services/matching.service';
import {
	Avatar,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import PageLoading from '../PageLoader';
import CvPreviewer from '../cv-previewer';

export interface RecommedResumeListProps {
	job: Job;
}

export default function RecommedResumeList({ job }: RecommedResumeListProps) {
	const { data: recommedResumes, isLoading } = useQuery(['recommed-resumes', { jobId: job.id }], () =>
		matchingService.suggestResumesForJob(job.id),
	);
	const [previewPayload, setPreviewPayload] = useState<Resume | null>();

	if (isLoading) return <PageLoading />;

	return (
		<div>
			<Table>
				<TableHeader>
					<TableColumn>Ứng viên</TableColumn>
					<TableColumn>Mức độ phù hợp</TableColumn>
					<TableColumn>CV</TableColumn>
				</TableHeader>

				<TableBody>
					{recommedResumes!.result.map((resume) => (
						<TableRow key={resume.id}>
							<TableCell>
								<Chip
									avatar={<Avatar src={fileService.getFileUrl(resume.applicant.user.image)} />}
									color='primary'
								>
									{resume.applicant.user.fullName}
								</Chip>
							</TableCell>

							<TableCell>{resume.score.toFixed(2)}%</TableCell>

							<TableCell>
								<Button
									size='sm'
									variant='light'
									color='primary'
									onClick={() => setPreviewPayload(resume)}
								>
									{resume.jobTitle}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<CvPreviewer isOpen={!!previewPayload} resume={previewPayload!} onClose={() => setPreviewPayload(null)} />
		</div>
	);
}
