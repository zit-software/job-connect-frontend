'use client';
import { Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { RootState } from '@/store';
import { NavbarBrand, NavbarContent, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import CustomNavbarItem from './custom-navbar-item';
import UserNav from './user-nav';

export const Navbar = () => {
	const user = useSelector((state: RootState) => state.user);

	return (
		<>
			<NextUINavbar maxWidth='xl' position='sticky' className='border-b-1'>
				<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
					<NavbarBrand as='li' className='gap-3 max-w-fit'>
						<Link className='flex justify-start items-center gap-2' href='/'>
							<Logo />
							<p className='font-bold text-inherit text-large text-primary'>{'Job Connect'}</p>
						</Link>
					</NavbarBrand>
					<ul className='hidden lg:flex gap-4 justify-start ml-2'>
						{siteConfig.navItems.map((item, index) => (
							<CustomNavbarItem key={index} item={item} />
						))}
					</ul>
				</NavbarContent>

				<NavbarContent className='flex basis-1 pl-4 items-center' justify='end'>
					{user ? (
						<UserNav user={user} />
					) : (
						<Button color='primary' href='/auth' as={Link}>
							Đăng nhập
						</Button>
					)}
				</NavbarContent>
			</NextUINavbar>
		</>
	);
};
