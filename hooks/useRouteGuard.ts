import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useRouteGuard() {
	const user = useSelector((state: RootState) => state.user);
	const router = useRouter();
	useEffect(() => {
		if (!user) {
			router.push('/auth');
			return;
		}
		if (user.userRole != 'RECRUITER') {
			router.push('/');
			return;
		}
	}, [user]);
	return user;
}
