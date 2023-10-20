/* eslint-disable @next/next/no-img-element */
'use client';
import SelectFileModal from '@/components/select-file-modal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UpdateUserRequestDto } from '@/services/auth.service';
import fileService from '@/services/file.service';
import { RootState } from '@/store';
import { Button, Input, Radio, RadioGroup, Spinner } from '@nextui-org/react';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useState } from 'react';

export default function ProfileSettingPage() {
	const user = useAppSelector((state: RootState) => state.user);
	const [isOpenSelectFileModal, setIsOpeSelectFileModal] = useState(false);

	const handleOpenSelectFileModal = () => setIsOpeSelectFileModal(true);
	const handleCloseSelectFileModal = () => setIsOpeSelectFileModal(false);

	if (!user) return <Spinner />;

	return (
		<>
			<h2 className='font-bold text-lg mb-2'>Thông tin cá nhân</h2>

			<Formik initialValues={user as UpdateUserRequestDto} enableReinitialize onSubmit={() => {}}>
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
								onChange={handleChange}
							/>

							<RadioGroup label='Giới tính' name='gender' value={values.gender} onChange={handleChange}>
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
								onChange={handleChange}
							/>

							<Button
								type='submit'
								color='primary'
								className='w-fit'
								startContent={<i className='bx bx-save'></i>}
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
