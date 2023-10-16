'use client';

import { RootState } from '@/store';
import { Avatar, Spinner } from '@nextui-org/react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
	const user = useSelector((state: RootState) => state.user);

	if (!user) return <Spinner />;

	return (
		<div className='w-[1280px] max-w-full mx-auto'>
			<div className='w-full h-96 bg-gradient-to-tr from-blue-200 to-violet-200 rounded-xl my-4'></div>
			<div className='-mt-20 flex items-end gap-2'>
				<Avatar
					src={user.avatar}
					size='lg'
					className='w-40 h-40 border-4 border-white'
				/>

				<div className='h-20'>
					<h2 className='font-bold  text-2xl'>{user.fullName}</h2>
				</div>
			</div>
		</div>
	);
}
