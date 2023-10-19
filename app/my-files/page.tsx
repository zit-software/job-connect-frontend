'use client';

import emptyLottie from '@/assets/lotties/empty.json';
import StyledDropzone from '@/components/company/DropZone';
import fileService, { UploadFileRequestDto } from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Formik } from 'formik';
import Lottie from 'lottie-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const initialValues: UploadFileRequestDto & {
	isSelected: boolean;
} = {
	name: 'File chưa được đặt tên',
	file: null as unknown as File,
	isSelected: false,
};

const valodationSchema = Yup.object().shape({
	name: Yup.string().required('Tên file không được để trống'),
});

export default function MyFilesPage() {
	const { data: fileList } = useQuery(['my-files'], () => fileService.getAllFiles());

	const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

	const [uploadModalParent] = useAutoAnimate();

	const handleOpenUploadModal = () => setIsOpenUploadModal(true);
	const handleCloseUploadModal = () => setIsOpenUploadModal(false);

	const handleUpload = async (values: UploadFileRequestDto) => {
		try {
			const res = await fileService.uploadFile(values);

			console.log(res);

			handleCloseUploadModal();
		} catch (error: any) {
			toast.error(error.message);
		} finally {
		}
	};

	return (
		<>
			<div className='w-[1280px] max-w-[95%] mx-auto'>
				<h2 className='text-2xl font-bold my-4 flex gap-2 items-center'>
					<span className='flex-1'>Quản lý file</span>

					<Button startContent={<i className='bx bx-cloud-upload'></i>} onClick={handleOpenUploadModal}>
						Tải lên
					</Button>
				</h2>

				<div className='w-full aspect-[16/9] bg-background rounded-xl border'>
					{fileList?.length ? (
						<></>
					) : (
						<Lottie animationData={emptyLottie} className='w-96 aspect-square m-auto' />
					)}
				</div>
			</div>

			<Modal isOpen={isOpenUploadModal} onClose={handleCloseUploadModal}>
				<ModalContent>
					{() => (
						<Formik
							enableReinitialize
							initialValues={initialValues}
							validationSchema={valodationSchema}
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
														errorMessage={errors.name}
														isInvalid={!!errors.name}
														onChange={handleChange}
													/>

													<div className='w-full p-2 flex items-center gap-2 border my-2 rounded-md'>
														<i className='bx bx-file'></i>
														<span className='text-sm font-semibold'>
															{values.file.name}
														</span>
													</div>
												</>
											) : (
												<StyledDropzone
													setFiles={(files) => {
														if (!files[0]) return;

														setFieldValue('file', files[0]);
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
												<Button onClick={() => setFieldValue('isSelected', false)}>
													Chọn lại
												</Button>
												<Button color='primary' type='submit'>
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
		</>
	);
}
