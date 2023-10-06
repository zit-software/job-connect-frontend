import { SiteConfig } from '@/config/site';
import { NavbarItem } from '@nextui-org/navbar';
import {
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

export interface NavbarItemProps {
	item: SiteConfig['navItems'][0];
}

export default function CustomNavbarItem({ item }: NavbarItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<NavbarItem
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Dropdown isOpen={isHovered}>
				<DropdownTrigger>
					<Link
						className={clsx(
							'data-[active=true]:text-primary data-[active=true]:font-medium',
						)}
						color='foreground'
						href='#'
					>
						{item.label}
					</Link>
				</DropdownTrigger>

				<DropdownMenu
					aria-label={`${item.label} menu`}
					className='w-80 p-4'
				>
					{item.children.map((child, index) => {
						return (
							<DropdownItem
								key={index}
								className={clsx({
									'p-4 my-1 bg-gray-100':
										typeof child !== 'string',
								})}
							>
								{typeof child === 'string' ? (
									<Divider />
								) : (
									<Link
										href={child.href}
										className='flex items-center gap-2 text-medium'
									>
										{child.icon}
										{child.label}
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
