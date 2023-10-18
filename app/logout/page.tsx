'use client';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { UserState, setUser } from '@/store/user';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LogoutPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				await authService.logout({
					refreshToken: tokenService.refreshToken,
				});
				dispatch(setUser(null as unknown as UserState));
				tokenService.clear();
				router.push('/auth');
			} catch (error: any) {
				toast.error(error.message);
			}
		})();
	}, [dispatch, router]);

	return (
		<div className='w-[1280px] max-w-full mx-auto flex justify-center py-48'>
			<Spinner label='Chúng tôi đang đăng xuất tài khoản của bạn' />
		</div>
	);
}
