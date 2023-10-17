import { SiteConfig } from '@/config/site';
import { NavbarItem } from '@nextui-org/navbar';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import styles from './navbar.module.scss';

export interface NavbarItemProps {
	item: SiteConfig['navItems'][0];
}

export default function CustomNavbarItem({ item }: NavbarItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<NavbarItem onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Dropdown isOpen={isHovered}>
				<DropdownTrigger>
					<Link
						className={clsx('data-[active=true]:text-primary data-[active=true]:font-medium')}
						color='foreground'
						href='#'
					>
						{item.label}
					</Link>
				</DropdownTrigger>

				<DropdownMenu aria-label={`${item.label} menu`} className='w-96 p-4'>
					{item.children.map((child, index) => {
						return (
							<DropdownItem
								textValue={index.toString()}
								key={index}
								className={clsx(
									{
										'my-1 bg-gray-100': typeof child !== 'string',
									},
									styles.navbarItem,
								)}
							>
								{typeof child === 'string' ? (
									<Divider />
								) : (
									<Link href={child.href} className='flex items-center gap-2 text-medium p-3'>
										{child.icon}
										<div className='flex-1'>
											{child.label}
											{child.hot && (
												<span className='ml-2 bg-gradient-to-tr from-green-500 to-blue-400 px-4 text-sm font-bold text-white rounded-md py-1'>
													Hot
												</span>
											)}
										</div>

										<i className={clsx('bx bx-right-arrow-alt opacity-50', styles.arrowRight)}></i>
									</Link>
								)}
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>
		</NavbarItem>
	);
}
