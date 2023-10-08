'use client';
import jobProposalLottie from '@/assets/lotties/job-proposal.json';
import logoLottie from '@/assets/lotties/logo.json';
import { title } from '@/components/primitives';
import { auth } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import toast from 'react-hot-toast';

export default function AuthPage() {
	const handleSignIn = async () => {
		try {
			const provider = new GoogleAuthProvider();

			const { user } = await signInWithPopup(auth, provider);

			const token = await user.getIdToken();
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className='container max-w-[1280px] border rounded-2xl shadow-xl my-4 mx-auto bg-white'>
			<div className='grid grid-cols-2'>
				<div className='col-span-2 md:col-span-1 flex flex-col gap-2 items-center p-8 border-r'>
					<Lottie
						animationData={logoLottie}
						alt='Logo'
						className='w-48 rounded-[48px] shadow-xl shadow-blue-100 overflow-hidden'
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
						onClick={handleSignIn}
					>
						<i className='bx bxl-google'></i> Tiếp tục với tài khoản
						Google
					</Button>

					<p className='text-default-600 text-center mt-4'>
						Bằng việc đăng nhập, bạn đã đồng ý với{' '}
						<a href='#' className='text-primary'>
							Điều khoản dịch vụ
						</a>{' '}
						và{' '}
						<a href='#' className='text-primary'>
							Chính sách bảo mật
						</a>{' '}
						của chúng tôi.
					</p>
				</div>
				<div className='col-span-2 md:col-span-1'>
					<Lottie animationData={jobProposalLottie} />
				</div>
			</div>
		</div>
	);
}
