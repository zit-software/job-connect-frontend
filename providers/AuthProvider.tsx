import { useAppDispatch } from '@/hooks/useAppDispatch';
import authService from '@/services/auth.service';
import { setUser } from '@/store/user';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			try {
				const user = await authService.identify();
				dispatch(setUser(user));
			} catch (error) {}
		})();
	}, [dispatch]);

	return <>{children}</>;
}
