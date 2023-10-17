'use client';

import applicantLottie from '@/assets/lotties/applicant.json';
import recruiterLottie from '@/assets/lotties/recruiter.json';
import { title } from '@/components/primitives';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import authService, { RegisterRequestDto } from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { selectIdToken } from '@/store/idToken';
import { setUser } from '@/store/user';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
} from '@nextui-org/react';
import clsx from 'clsx';
import { Formik } from 'formik';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const initialValues: RegisterRequestDto = {
	accessToken: '',
	fullName: '',
	phoneNumber: '',
	userRole: 'APPLICANT',
	dob: '',
	gender: 'MALE',
};

const validationSchema = Yup.object().shape({
	accessToken: Yup.string().required('Vui lòng nhập mã truy cập'),
	fullName: Yup.string().required('Vui lòng nhập họ và tên'),
	phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
	userRole: Yup.string()
		.required('Vui lòng chọn vai trò của bạn')
		.oneOf(['APPLICANT', 'RECRUITER']),
	dob: Yup.date().required('Vui lòng nhập ngày sinh'),
	gender: Yup.string().required('Vui lòng chọn giới tính'),
});

const maxStep = 3;

export default function RegisterPage() {
	const [step, setStep] = useState(1);
	const [isRegisting, setIsRegisting] = useState(false);

	const [formParent] = useAutoAnimate();
	const [actionParent] = useAutoAnimate();

	const dispatch = useAppDispatch();
	const router = useRouter();

	const idToken = useAppSelector(selectIdToken);

	if (!idToken) {
		router.push('/auth');
	}

	const handleSubmit = async (values: RegisterRequestDto) => {
		try {
			setIsRegisting(true);

			const { accessToken, refreshToken, expirationTime } =
				await authService.register(values);

			tokenService.accessToken = accessToken;
			tokenService.refreshToken = refreshToken;
			tokenService.expiratedAt = expirationTime;

			const user = await authService.identify();

			dispatch(setUser(user));

			router.push('/');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsRegisting(false);
		}
	};

	const nextStep = () => {
		setStep((prev) => prev + 1);
	};

	const prevStep = () => {
		setStep((prev) => prev - 1);
	};

	const canNext = step < maxStep;
	const canPrev = step > 1;

	return (
		<div className='p-12 w-[560px] max-w-full'>
			<h2 className='text-center font-bold text-large text-default-600'>
				Đăng ký tài khoản tại <br />{' '}
				<span
					className={clsx(
						title({
							color: 'blue',
						}),
					)}
				>
					ZIT Job Connect
				</span>
			</h2>

			<Formik
				initialValues={{
					...initialValues,
					accessToken: idToken as string,
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, errors, handleSubmit, handleChange }) => (
					<form
						className='flex flex-col gap-4 mt-6 mx-auto'
						ref={formParent}
						onSubmit={handleSubmit}
					>
						<p className='text-default-600'>
							Các thông tin dưới đây bao gồm ảnh đại diện và email
							của bạn sẽ được lưu trữ trên hệ thống của chúng tôi.
						</p>
						{[1, 3].includes(step) && (
							<>
								<Input
									label='Họ và tên'
									placeholder='Nguyễn Văn Zịt'
									autoFocus
									autoComplete='name'
									name='fullName'
									value={values.fullName}
									isInvalid={!!errors.fullName}
									errorMessage={errors.fullName}
									onChange={handleChange}
								/>

								<Input
									label='Số điện thoại'
									placeholder='+84 123 456 789'
									autoComplete='phone'
									name='phoneNumber'
									value={values.phoneNumber}
									isInvalid={!!errors.phoneNumber}
									errorMessage={errors.phoneNumber}
									onChange={handleChange}
								/>

								<Input
									name='dob'
									label='Ngày sinh'
									placeholder='DD/MM/YYYY'
									type='date'
									onChange={handleChange}
									value={values.dob}
									isInvalid={!!errors.dob}
									errorMessage={errors.dob}
								/>

								<Select
									name='gender'
									value={values.gender}
									selectedKeys={[values.gender]}
									isInvalid={!!errors.gender}
									errorMessage={errors.gender}
									onChange={handleChange}
									label='Giới tính'
									placeholder='Chọn giới tính'
								>
									<SelectItem key='MALE' value='MALE'>
										Nam
									</SelectItem>

									<SelectItem key='FEMALE' value='FEMALE'>
										Nữ
									</SelectItem>
									<SelectItem key='OTHER' value='OTHER'>
										Khác
									</SelectItem>
								</Select>
							</>
						)}

						{[2, 3].includes(step) && (
							<>
								<RadioGroup
									label='Bạn là ai?'
									name='userRole'
									value={values.userRole}
									isInvalid={!!errors.userRole}
									errorMessage={errors.userRole}
									onChange={handleChange}
								>
									<div className='grid grid-cols-2 gap-5'>
										<Radio
											key='RECRUITER'
											value='RECRUITER'
											className={clsx(
												'col-span-1 border-transparent border-2 rounded-xl',
												{
													'opacity-50':
														values.userRole !==
														'RECRUITER',
													'border-blue-500':
														values.userRole ===
														'RECRUITER',
												},
											)}
										>
											Nhà tuyển dụng
											<Lottie
												animationData={recruiterLottie}
											/>
										</Radio>

										<Radio
											key='APPLICANT'
											value='APPLICANT'
											className={clsx(
												'col-span-1 border-transparent border-2 rounded-xl',
												{
													'opacity-50':
														values.userRole !==
														'APPLICANT',
													'border-blue-500':
														values.userRole ===
														'APPLICANT',
												},
											)}
										>
											Người tìm việc
											<Lottie
												animationData={applicantLottie}
											/>
										</Radio>
									</div>
								</RadioGroup>
							</>
						)}

						<div className='flex gap-2' ref={actionParent}>
							{canPrev && (
								<Button
									type='button'
									className='flex-1'
									startContent={
										<i className='bx bx-left-arrow-alt'></i>
									}
									onClick={prevStep}
								>
									Quay lại
								</Button>
							)}
							{canNext && (
								<Button
									color='primary'
									type='button'
									className='flex-1'
									endContent={
										<i className='bx bx-right-arrow-alt'></i>
									}
									onClick={nextStep}
								>
									Tiếp tục
								</Button>
							)}
							{step === maxStep && (
								<Button
									color='primary'
									className='flex-1'
									type='submit'
									isLoading={isRegisting}
								>
									Đăng ký
								</Button>
							)}
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
