'use client';
import { Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { RootState } from '@/store';
import { NavbarBrand, NavbarContent, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import CustomNavbarItem from './custom-navbar-item';
import UserNav from './user-nav';

export const Navbar = () => {
	const user = useSelector((state: RootState) => state.user);
	const router = useRouter();

	return (
		<>
			<NextUINavbar maxWidth='xl' position='sticky' className='border-b-1'>
				<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
					<NavbarBrand as='li' className='gap-3 max-w-fit'>
						<NextLink className='flex justify-start items-center gap-2' href='/'>
							<Logo />
							<p className='font-black text-inherit text-large text-primary lowercase'>
								{user ? user.userRole : 'Job Connect'}
							</p>
						</NextLink>
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
						<NextLink href='/auth'>
							<Button color='primary'>Đăng nhập</Button>
						</NextLink>
					)}
				</NavbarContent>
			</NextUINavbar>
		</>
	);
};
