/* eslint-disable @next/next/no-img-element */
'use client';
import SelectFileModal from '@/components/select-file-modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import authService, { UpdateUserRequestDto } from '@/services/auth.service';
import fileService from '@/services/file.service';
import { RootState } from '@/store';
import { setUser } from '@/store/userSlice';
import { Button, Input, Radio, RadioGroup, Spinner } from '@nextui-org/react';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Họ tên không được để trống'),
	image: Yup.string().required('Ảnh đại diện không được để trống'),
	phoneNumber: Yup.string()
		.required('Số điện thoại không được để trống')
		.matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
		.length(10, 'Số điện thoại không hợp lệ'),
	gender: Yup.string().required('Giới tính không được để trống').oneOf(['MALE', 'FEMALE', 'OTHER']),
	dob: Yup.date().required('Ngày sinh không được để trống').max(new Date(), 'Ngày sinh không hợp lệ'),
});

export default function ProfileSettingPage() {
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const [isOpenSelectFileModal, setIsOpeSelectFileModal] = useState(false);
	const [isSumitting, setIsSumitting] = useState(false);

	const handleOpenSelectFileModal = () => setIsOpeSelectFileModal(true);
	const handleCloseSelectFileModal = () => setIsOpeSelectFileModal(false);

	const handleSubmit = async (values: UpdateUserRequestDto) => {
		try {
			setIsSumitting(true);
			const res = await authService.updateUser(values);

			dispatch(setUser(res));
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsSumitting(false);
		}
	};

	if (!user) return <Spinner />;

	return (
		<>
			<h2 className='font-bold text-lg mb-2'>Thông tin cá nhân</h2>

			<Formik
				initialValues={user as UpdateUserRequestDto}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
					<>
						<form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
							<img
								src={fileService.getFileUrl(values.image)}
								alt={values.fullName}
								className='w-32 aspect-square object-cover rounded-full cursor-pointer my-4'
								onClick={handleOpenSelectFileModal}
							/>

							<Input
								label='Họ tên'
								placeholder='Nguyễn Văn Zịt'
								name='fullName'
								value={values.fullName}
								isInvalid={!!errors.fullName}
								errorMessage={errors.fullName}
								onChange={handleChange}
							/>

							<Input
								label='Số điện thoại'
								placeholder='0123456789'
								name='phoneNumber'
								value={values.phoneNumber}
								isInvalid={!!errors.phoneNumber}
								errorMessage={errors.phoneNumber}
								onChange={handleChange}
							/>

							<RadioGroup
								label='Giới tính'
								name='gender'
								value={values.gender}
								isInvalid={!!errors.gender}
								errorMessage={errors.gender}
								onChange={handleChange}
							>
								<Radio key='MALE' value='MALE'>
									Nam
								</Radio>

								<Radio key='FEMALE' value='FEMALE'>
									Nữ
								</Radio>

								<Radio key='OTHER' value='OTHER'>
									Khác
								</Radio>
							</RadioGroup>

							<Input
								label='Ngày sinh'
								placeholder='Ngày sinh'
								name='dob'
								type='date'
								value={dayjs(values.dob).format('YYYY-MM-DD')}
								isInvalid={!!errors.dob}
								errorMessage={errors.dob}
								onChange={handleChange}
							/>

							<Button
								type='submit'
								color='primary'
								className='w-fit'
								startContent={<i className='bx bx-save'></i>}
								isLoading={isSumitting}
							>
								Cập nhật
							</Button>
						</form>

						<SelectFileModal
							isOpen={isOpenSelectFileModal}
							onClose={handleCloseSelectFileModal}
							onSelected={(file) => {
								setFieldValue('image', file.id);
								handleCloseSelectFileModal();
							}}
						/>
					</>
				)}
			</Formik>
		</>
	);
}
