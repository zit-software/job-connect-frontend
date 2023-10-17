import { Resume } from '@/models/Resume';
import resumeService, {
	CreateResumeRequestDto,
} from '@/services/resume.service';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal';
import { Button, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export interface CreateResumeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCreated?: (resume: Resume) => void;
}

const initialValues: CreateResumeRequestDto = {
	jobTitle: '',
	content: '',
	skillIds: [],
};

const validationSchema = Yup.object().shape({
	jobTitle: Yup.string().required('Vui lòng nhập tiêu đề'),
});

export default function CreateResumeModal({
	onCreated,
	...props
}: CreateResumeModalProps) {
	const [isCreating, setIsCreating] = useState(false);

	const handleSubmit = async (value: CreateResumeRequestDto) => {
		try {
			setIsCreating(true);

			const resume = await resumeService.create(value);

			onCreated?.(resume);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<Modal {...props}>
			<ModalContent>
				{(onClose) => (
					<Formik
						initialValues={initialValues}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, errors, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<ModalHeader className='flex items-center gap-2'>
									<i className='bx bx-file'></i> Tạo CV
								</ModalHeader>

								<ModalBody>
									<Input
										label='Tiêu đề'
										placeholder='Frontend Developer'
										name='jobTitle'
										autoFocus
										value={values.jobTitle}
										isInvalid={!!errors.jobTitle}
										errorMessage={errors.jobTitle}
										onChange={handleChange}
									/>
								</ModalBody>

								<ModalFooter>
									<Button
										type='button'
										variant='light'
										onClick={onClose}
									>
										Hủy
									</Button>

									<Button
										type='submit'
										color='primary'
										isLoading={isCreating}
									>
										Tạo
									</Button>
								</ModalFooter>
							</form>
						)}
					</Formik>
				)}
			</ModalContent>
		</Modal>
	);
}
