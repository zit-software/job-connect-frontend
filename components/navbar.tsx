'use client';
import { Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';
import {
	NavbarBrand,
	NavbarContent,
	Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import NextLink from 'next/link';
import CustomNavbarItem from './custom-navbar-item';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import fileService from '@/services/file.service';

export const Navbar = () => {
	const user = useSelector((state: RootState) => state.user);
	const router = useRouter();

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
					className='hidden lg:flex basis-1 pl-4 items-center'
					justify='end'
				>
					{user ? (
						<>
							<Dropdown size='lg' placement='bottom-end'>
								<DropdownTrigger>
									<div className='p-2 bg-primary-50 rounded-full flex gap-2 items-center pl-4 cursor-pointer'>
										<span className='text-primary-600 text-sm font-bold'>
											{user.fullName}
										</span>
										<Avatar
											src={fileService.getFileUrl(
												user.image,
											)}
										/>
									</div>
								</DropdownTrigger>

								<DropdownMenu aria-label='Account menu'>
									<DropdownItem
										startContent={
											<i className='bx bx-user'></i>
										}
										onClick={() => router.push('/profile')}
									>
										Thông tin cá nhân
									</DropdownItem>

									{user.userRole === 'APPLICANT' ? (
										<DropdownItem
											startContent={
												<i className='bx bx-file'></i>
											}
											onClick={() =>
												router.push('/my-resumes')
											}
										>
											CV của tôi
										</DropdownItem>
									) : (
										<DropdownItem
											startContent={
												<i className='bx bx-building'></i>
											}
											onClick={() =>
												router.push('/my-companies')
											}
										>
											Công ty của tôi
										</DropdownItem>
									)}

									<DropdownItem
										startContent={
											<i className='bx bx-cog'></i>
										}
										onClick={() =>
											router.push('/settings/profile')
										}
									>
										Cài đặt
									</DropdownItem>

									<DropdownItem
										color='danger'
										startContent={
											<i className='bx bx-log-out'></i>
										}
										onClick={() => router.push('/logout')}
									>
										Đăng xuất
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</>
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
