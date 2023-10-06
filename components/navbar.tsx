'use client';
import { GithubIcon, Logo } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { Link } from '@nextui-org/link';
import {
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { Button, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import CustomNavbarItem from './custom-navbar-item';

export const Navbar = () => {
	const { isOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<NextUINavbar
				maxWidth='xl'
				position='sticky'
				className='border-b-1'
			>
				<NavbarContent
					className='basis-1/5 sm:basis-full'
					justify='start'
				>
					<NavbarBrand as='li' className='gap-3 max-w-fit'>
						<NextLink
							className='flex justify-start items-center gap-2'
							href='/'
						>
							<Logo />
							<p className='font-black text-inherit  text-large'>
								JobConnect
							</p>
						</NextLink>
					</NavbarBrand>
					<ul className='hidden lg:flex gap-4 justify-start ml-2'>
						{siteConfig.navItems.map((item, index) => (
							<CustomNavbarItem key={index} item={item} />
						))}
					</ul>
				</NavbarContent>

				<NavbarContent
					className='hidden lg:flex basis-1 pl-4'
					justify='end'
				>
					<NextLink href='/auth'>
						<Button color='primary'>Đăng nhập</Button>
					</NextLink>
				</NavbarContent>
			</NextUINavbar>
		</>
	);
};
