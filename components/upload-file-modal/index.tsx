import StyledDropzone from '@/components/company/DropZone';
import { queryClient } from '@/providers/QueryClientProvider';
import fileService, { UploadFileRequestDto } from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export interface UploadFileModalProps {
	isOpen: boolean;
	onClose?: () => void;
}

const initialValues: UploadFileRequestDto & {
	isSelected: boolean;
} = {
	name: 'File chưa được đặt tên',
	file: null as unknown as File,
	isSelected: false,
};

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Tên file không được để trống'),
});

export default function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
	const [uploadModalParent] = useAutoAnimate();
	const [isUploadingFile, setIsUploadingFile] = useState(false);

	const handleUpload = async (values: UploadFileRequestDto) => {
		try {
			setIsUploadingFile(true);
			const file = await fileService.uploadFile(values);

			queryClient.setQueryData(['my-files'], (oldData: any) => [file, ...oldData]);

			onClose?.();
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsUploadingFile(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{() => (
					<Formik
						enableReinitialize
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleUpload}
					>
						{({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<ModalHeader>Tải file lên</ModalHeader>
								<ModalBody>
									<div ref={uploadModalParent}>
										{values.isSelected ? (
											<>
												<Input
													label='Tên file'
													placeholder='Tên file'
													value={values.name}
													name='name'
													autoFocus
													errorMessage={errors.name}
													isInvalid={!!errors.name}
													onChange={handleChange}
												/>

												<div className='w-full p-2 flex items-center gap-2 border my-2 rounded-md'>
													<i className='bx bx-file'></i>
													<span className='text-sm font-semibold'>{values.file.name}</span>
												</div>
											</>
										) : (
											<StyledDropzone
												setFiles={(files) => {
													if (!files[0]) return;

													setFieldValue('file', files[0]);
													setFieldValue('name', files[0].name);
													setFieldValue('isSelected', true);
												}}
												accept={{
													'image/*': [],
													'application/pdf': [],
												}}
											/>
										)}
									</div>
								</ModalBody>
								<ModalFooter>
									{values.isSelected && (
										<>
											<Button onClick={() => setFieldValue('isSelected', false)}>Chọn lại</Button>
											<Button color='primary' type='submit' isLoading={isUploadingFile}>
												Tải lên
											</Button>
										</>
									)}
								</ModalFooter>
							</form>
						)}
					</Formik>
				)}
			</ModalContent>
		</Modal>
	);
}
