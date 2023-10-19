import { useMemo, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

const baseStyle: React.CSSProperties = {
	borderWidth: 2,
	borderStyle: 'dashed',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out',
};

const focusedStyle = {
	borderColor: '#2196f3',
};

const acceptStyle = {
	borderColor: '#00e676',
};

const rejectStyle = {
	borderColor: '#ff1744',
};

interface StyledDropzoneProps {
	setFiles: (acceptedFiles: File[]) => void;
	accept?: Accept;
	heightClass?: string;
}

function StyledDropzone({ setFiles, accept = { 'image/*': [] }, heightClass }: StyledDropzoneProps) {
	const [prevBlob, setPrevBlob] = useState<string[]>([]);

	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		accept,
		onDrop: (acceptedFiles) => {
			prevBlob.forEach(URL.revokeObjectURL);

			const files = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			);

			setPrevBlob(files.map((e) => e.preview));

			setFiles(files);
		},
	});

	const style: any = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject],
	);

	return (
		<div className={'container max-w-[100%] ' + heightClass}>
			<div
				{...getRootProps({
					style,
					className: 'w-full h-full flex flex-col items-center justify-center aspect-square',
				})}
			>
				<i className='bx bx-cloud-upload text-6xl text-gray-300'></i>
				<span className='text-gray-300'>Kéo thả hoặc chọn file từ máy tính</span>
				<input {...getInputProps()} />
			</div>
		</div>
	);
}

export default StyledDropzone;
