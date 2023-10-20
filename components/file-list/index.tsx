import emptyLottie from '@/assets/lotties/empty.json';
import { FileModel } from '@/models/File';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Spinner } from '@nextui-org/react';
import Lottie from 'lottie-react';
import FileItem from '../file-item';

export interface FileListProps {
	files: FileModel[];
	isLoading?: boolean;
	onSelected?: (file: FileModel) => void;
}

export default function FileList({ files, isLoading, onSelected }: FileListProps) {
	const [fileListParent] = useAutoAnimate();

	return isLoading ? (
		<div className='w-fit mx-auto my-10'>
			<Spinner />
		</div>
	) : files?.length ? (
		<div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6' ref={fileListParent}>
			{files.map((file) => (
				<FileItem key={file.id} file={file} onSelected={onSelected} />
			))}
		</div>
	) : (
		<Lottie animationData={emptyLottie} className='w-96 aspect-square m-auto' />
	);
}
