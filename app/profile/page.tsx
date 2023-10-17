'use client';

import fileService from '@/services/file.service';
import { RootState } from '@/store';
import { Avatar, Chip, Spinner } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
	const user = useSelector((state: RootState) => state.user);

	if (!user) return <Spinner />;

	return (
		<div className='w-[1280px] max-w-full mx-auto'>
			<div className='w-full h-96 bg-gradient-to-tr from-blue-200 to-violet-200 rounded-xl my-4'></div>
			<div className='-mt-20 flex items-end gap-2'>
				<Avatar
					src={fileService.getFileUrl(user.image)}
					size='lg'
					className='w-40 h-40 border-4 border-white'
				/>

				<div className='h-20'>
					<h2 className='font-bold  text-2xl'>{user.fullName}</h2>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
				<div className='col-span-1 bg-background rounded-xl border overflow-hidden'>
					<div className='py-2 px-4 bg-blue-500 text-white font-bold'>
						<h4>Thông tin cá nhân</h4>
					</div>

					<div className='flex flex-col gap-2 py-2 px-4'>
						<Chip variant='light' startContent={<i className='bx bx-user'></i>}>
							<strong>Họ và tên:</strong> {user.fullName}
						</Chip>

						<Chip variant='light' startContent={<i className='bx bx-male-female'></i>}>
							<strong>Giới tính:</strong> {user.gender}
						</Chip>

						<Chip variant='light' startContent={<i className='bx bx-cake'></i>}>
							<strong>Ngày sinh:</strong> {dayjs(user.dob).format('DD/MM/YYYY')}
						</Chip>

						<Chip variant='light' startContent={<i className='bx bx-envelope'></i>}>
							<strong>Email:</strong> {user.email}
						</Chip>

						<Chip variant='light' startContent={<i className='bx bx-phone'></i>}>
							<strong>Số điện thoại:</strong> {user.phoneNumber}
						</Chip>
					</div>
				</div>

				<div className='col-span-2 bg-background rounded-xl border overflow-hidden'>
					<div className='py-2 px-4 bg-blue-500 text-white font-bold'>
						<h4>Tự giới thiệu</h4>
					</div>

					<div className='flex flex-col gap-2 py-2 px-4'></div>
				</div>
			</div>
		</div>
	);
}
