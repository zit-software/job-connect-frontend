'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import { Button, Input, Radio, RadioGroup, Spinner } from '@nextui-org/react';

export default function SettingsPage() {
	const user = useAppSelector((state: RootState) => state.user);

	if (!user) return <Spinner />;

	return (
		<div className='w-[1280px] max-w-full mx-auto bg-background border p-4 rounded-xl my-4'>
			<h2 className='font-bold text-lg mb-2'>Thông tin cá nhân</h2>

			<div className='grid grid-cols-2'>
				<form className='flex flex-col gap-3'>
					<Input
						label='Họ tên'
						placeholder='Nguyễn Văn Zịt'
						value={user.fullName}
					/>

					<Input
						label='Email'
						placeholder='root@zit.com'
						disabled
						value={user.email}
					/>

					<RadioGroup label='Giới tính' value={user.gender}>
						<Radio key='MALE' value='MALE'>
							Nam
						</Radio>

						<Radio key='FEMALE' value='FEMALE'>
							Nữ
						</Radio>
					</RadioGroup>

					<Button
						type='submit'
						color='primary'
						className='w-fit'
						startContent={<i className='bx bx-save'></i>}
					>
						Cập nhật
					</Button>
				</form>
			</div>
		</div>
	);
}
