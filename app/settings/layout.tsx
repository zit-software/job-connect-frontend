'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => {
	return (
		<Link
			href={href}
			className={clsx('p-4 rounded-xl flex items-center gap-2 transition-all', {
				'bg-primary-200 text-primary font-bold': active,
			})}
		>
			{children}
		</Link>
	);
};

const items = [
	{
		href: '/settings/profile',
		icon: 'bx bx-user',
		text: 'Thông tin cá nhân',
	},
	{
		href: '/settings/2fa',
		icon: 'bx bx-key',
		text: 'Xác thực 2 lớp',
	},
	{
		href: '/settings/delete-account',
		icon: 'bx bx-trash',
		text: 'Xóa tài khoản',
	},
];

export default function SettingsPage({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className='w-[1280px] max-w-[95%] mx-auto my-4'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
				<div className='col-span-1 flex flex-col gap-2'>
					{items.map((item) => (
						<NavItem key={item.href} href={item.href} active={item.href === pathname}>
							<i className={item.icon}></i>
							<span>{item.text}</span>
						</NavItem>
					))}
				</div>
				<div className='col-span-2 bg-background border rounded-xl py-4 px-8'>{children}</div>
			</div>
		</div>
	);
}
