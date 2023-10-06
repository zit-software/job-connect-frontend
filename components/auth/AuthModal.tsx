'use client';
import { auth } from '@/config/firebase';
import authService, { LoginDTO, RegisterDTO } from '@/services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import * as Yup from 'yup';
const modalVariants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 15,
			stiffness: 100,
		},
	},
};
export const AuthModal = ({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: () => void;
}) => {
	const [modalType, setModalType] = useState('Login');

	const handleLogin = async (values: LoginDTO) => {
		const response = await authService.login(values);
		console.log(response);
	};
	const handleRegister = async (values: RegisterDTO) => {
		const response = await authService.register(values);
		console.log(response);
	};
	const handleChangeModal = () => {
		setModalType(modalType === 'Login' ? 'Register' : 'Login');
	};
	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		const userDetail = await signInWithPopup(auth, provider);
		authService.socialLogin({
			accessToken: (userDetail.user as any).accessToken,
		});
	};
	return (
		<Modal isOpen={open} placement='center' onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{modalType.toUpperCase()}
						</ModalHeader>
						{modalType === 'Login' ? (
							<Formik
								key={modalType}
								initialValues={{
									email: '',
									password: '',
								}}
								validationSchema={Yup.object().shape({
									email: Yup.string()
										.required('Your email cannot be empty!')
										.email('Invalid Email!'),
									password: Yup.string()
										.required(
											'Your password cannot be empty',
										)
										.min(
											8,
											'Password must be longer than 8 characters',
										),
								})}
								onSubmit={handleLogin}
							>
								{({
									handleChange,
									values,
									errors,
									handleSubmit,
								}) => (
									<form onSubmit={handleSubmit}>
										<motion.div
											key={modalType}
											initial='hidden'
											variants={modalVariants}
											animate='visible'
										>
											<ModalBody>
												<Input
													isInvalid={!!errors.email}
													errorMessage={errors.email}
													value={values.email}
													name='email'
													label='Email'
													placeholder='Enter your email'
													onChange={handleChange}
												/>
												<Input
													isInvalid={
														!!errors.password
													}
													errorMessage={
														errors.password
													}
													value={values.password}
													name='password'
													label='Password'
													placeholder='Enter your password'
													type='password'
													onChange={handleChange}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													startContent={
														<FontAwesomeIcon
															icon={faGoogle}
														/>
													}
													variant='light'
													onClick={handleGoogleLogin}
												>
													Login with Google
												</Button>
												<Button
													type='submit'
													color='primary'
												>
													Submit
												</Button>
												<Button
													color='primary'
													variant='light'
													onPress={handleChangeModal}
												>
													Or{' '}
													{modalType === 'Login'
														? 'Register'
														: 'Login'}
												</Button>
											</ModalFooter>
										</motion.div>
									</form>
								)}
							</Formik>
						) : (
							<Formik
								key={modalType}
								initialValues={{
									email: '',
									password: '',
									rePassword: '',
								}}
								validationSchema={Yup.object().shape({
									email: Yup.string()
										.required('Your email cannot be empty!')
										.email('Invalid Email!'),
									password: Yup.string()
										.required(
											'Your password cannot be empty',
										)
										.min(
											8,
											'Password must be longer than 8 characters',
										),
									rePassword: Yup.string().oneOf(
										[Yup.ref('password')],
										'Passwords must match',
									),
								})}
								onSubmit={handleRegister}
							>
								{({
									handleChange,
									values,
									errors,
									handleSubmit,
								}) => (
									<form onSubmit={handleSubmit}>
										<motion.div
											key={modalType}
											initial='hidden'
											variants={modalVariants}
											animate='visible'
										>
											<ModalBody>
												<Input
													isInvalid={!!errors.email}
													errorMessage={errors.email}
													value={values.email}
													name='email'
													label='Email'
													placeholder='Enter your email'
													onChange={handleChange}
												/>
												<Input
													isInvalid={
														!!errors.password
													}
													errorMessage={
														errors.password
													}
													value={values.password}
													name='password'
													label='Password'
													placeholder='Enter your password'
													type='password'
													onChange={handleChange}
												/>
												<Input
													isInvalid={
														!!errors.rePassword
													}
													errorMessage={
														errors.rePassword
													}
													value={values.rePassword}
													name='rePassword'
													label='Re-password'
													placeholder='Re-enter your password'
													type='password'
													onChange={handleChange}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													startContent={
														<FontAwesomeIcon
															icon={faGoogle}
														/>
													}
													variant='light'
													onClick={handleGoogleLogin}
												>
													Login with Google
												</Button>
												<Button
													type='submit'
													color='primary'
												>
													Submit
												</Button>
												<Button
													color='primary'
													variant='light'
													onPress={handleChangeModal}
												>
													Or{' '}
													{modalType === 'Login'
														? 'Register'
														: 'Login'}
												</Button>
											</ModalFooter>
										</motion.div>
									</form>
								)}
							</Formik>
						)}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
