import fileService from '@/services/file.service';
import { UserState } from '@/store/userSlice';
import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';

export interface UserNavProps {
	user: UserState;
	size?: 'sm' | 'md' | 'lg';
}

export default function UserNav({ user, size = 'md' }: UserNavProps) {
	const router = useRouter();

	return (
		<Dropdown size='lg' placement='bottom-end'>
			<DropdownTrigger>
				<div className='p-2 bg-primary-600 rounded-full flex gap-2 items-center pl-4 cursor-pointer bg-opacity-30 h-fit my-auto'>
					<span className='text-primary-600 text-sm font-bold'>{user.fullName}</span>
					<Avatar src={fileService.getFileUrl(user.image)} size={size} />
				</div>
			</DropdownTrigger>

			<DropdownMenu aria-label='Account menu'>
				<DropdownItem startContent={<i className='bx bx-user'></i>} onClick={() => router.push('/profile')}>
					Thông tin cá nhân
				</DropdownItem>

				{user.userRole === 'APPLICANT' ? (
					<DropdownItem
						startContent={<i className='bx bx-file'></i>}
						onClick={() => router.push('/my-resumes')}
					>
						CV của tôi
					</DropdownItem>
				) : (
					<DropdownItem
						startContent={<i className='bx bx-building'></i>}
						onClick={() => router.push('/my-companies')}
					>
						Công ty của tôi
					</DropdownItem>
				)}

				<DropdownItem startContent={<i className='bx bx-folder'></i>} onClick={() => router.push('/my-files')}>
					Quản lý file
				</DropdownItem>

				<DropdownItem
					startContent={<i className='bx bx-cog'></i>}
					onClick={() => router.push('/settings/profile')}
				>
					Cài đặt
				</DropdownItem>

				<DropdownItem
					color='danger'
					startContent={<i className='bx bx-log-out'></i>}
					onClick={() => router.push('/logout')}
				>
					Đăng xuất
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
