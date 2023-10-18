'use client';

import emptyLottie from '@/assets/lotties/empty.json';
import StyledDropzone from '@/components/company/DropZone';
import { UploadFileRequestDto } from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Formik } from 'formik';
import Lottie from 'lottie-react';
import { useState } from 'react';

const initialValues: UploadFileRequestDto & {
	isSelected: boolean;
} = {
	name: 'File chưa được đặt tên',
	file: new File([], ''),
	isSelected: false,
};

export default function MyFilesPage() {
	const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

	const [uploadModalParent] = useAutoAnimate();

	const handleOpenUploadModal = () => setIsOpenUploadModal(true);
	const handleCloseUploadModal = () => setIsOpenUploadModal(false);

	const handleUpload = async (values: UploadFileRequestDto) => {
		try {
		} catch (error) {}
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
					<Lottie animationData={emptyLottie} className='w-96 aspect-square m-auto' />
				</div>
			</div>

			<Modal isOpen={isOpenUploadModal} onClose={handleCloseUploadModal}>
				<ModalContent>
					{() => (
						<Formik enableReinitialize initialValues={initialValues} onSubmit={handleUpload}>
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
