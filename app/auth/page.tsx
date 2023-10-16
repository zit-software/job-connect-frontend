'use client';
import jobProposalLottie from '@/assets/lotties/job-proposal.json';
import logoLottie from '@/assets/lotties/logo.json';
import { title } from '@/components/primitives';
import { auth } from '@/config/firebase';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { setIdToken } from '@/store/idToken';
import { setUser } from '@/store/user';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AuthPage() {
	const [isSigningIn, setIsSigningIn] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSignIn = async () => {
		try {
			setIsSigningIn(true);
			const provider = new GoogleAuthProvider();

			const { user: _user } = await signInWithPopup(auth, provider);

			const idToken = await _user.getIdToken();

			const isRegistered = await authService.checkUser({
				accessToken: idToken,
			});

			if (!isRegistered.isUser) {
				dispatch(setIdToken(idToken));

				return router.push(`/auth/register`);
			}

			const { accessToken, refreshToken } = await authService.socialLogin(
				{
					accessToken: idToken,
				},
			);

			tokenService.accessToken = accessToken;
			tokenService.refreshToken = refreshToken;

			const user = await authService.identify();

			dispatch(setUser(user));

			router.push('/');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<div className='w-[1280px] max-w-full grid grid-cols-2'>
			<div className='col-span-2 md:col-span-1 flex flex-col justify-center gap-2 items-center p-8 border-r'>
				<Lottie
					animationData={logoLottie}
					alt='Logo'
					className='w-48 rounded-[48px] shadow-xl shadow-blue-100 overflow-hidden h-48 bg-blue-200'
				/>

				<h2
					className={clsx(
						title({
							color: 'blue',
						}),
						'mt-4 block text-center',
					)}
				>
					Job Connect
				</h2>

				<p className='text-center text-default-600'>
					Đăng nhập để tìm kiếm công việc phù hợp với bạn
				</p>

				<Button
					color='primary'
					size='lg'
					variant='shadow'
					className='mt-4'
					isLoading={isSigningIn}
					onClick={handleSignIn}
				>
					<i className='bx bxl-google'></i> Tiếp tục với tài khoản
					Google
				</Button>
			</div>
			<div className='col-span-2 md:col-span-1'>
				<Lottie
					animationData={jobProposalLottie}
					className='aspect-square'
				/>
			</div>
		</div>
	);
}
