'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function AuthPage({ children }: { children: React.ReactNode }) {
	const [authParent] = useAutoAnimate();

	return (
		<div
			ref={authParent}
			className='border rounded-2xl shadow-xl my-4 mx-auto bg-white w-[1280px] max-w-full flex flex-col items-center'
		>
			{children}

			<p className='text-default-600 text-center p-4 max-w-[400px] mx-auto'>
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
	);
}
