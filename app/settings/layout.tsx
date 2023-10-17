'use client';

import Link from 'next/link';

export default function SettingsPage({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='w-[1280px] max-w-full mx-auto my-4'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
				<div className='col-span-1 flex flex-col gap-2'>
					<Link
						href='settings/profile'
						className='p-4 bg-primary text-white font-bold  shadow-blue-400 shadow-lg rounded-xl'
					>
						<i className='bx bx-user'></i>{' '}
						<span>Thông tin cá nhân</span>
					</Link>

					<Link href='settings/2fa' className='p-4 font-bold'>
						<i className='bx bx-key'></i>{' '}
						<span>Xác thực 2 lớp</span>
					</Link>

					<Link
						href='settings/delete-account'
						className='p-4 font-bold'
					>
						<i className='bx bx-trash'></i>{' '}
						<span>Xóa tài khoản</span>
					</Link>
				</div>
				<div className='col-span-2 bg-background border rounded-xl py-4 px-8'>
					{children}
				</div>
			</div>
		</div>
	);
}
