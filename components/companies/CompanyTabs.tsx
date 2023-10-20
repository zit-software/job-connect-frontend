'use client';

import companyService from '@/services/company.service';
import { RootState } from '@/store';
import IdInParams from '@/types/IdInParams';
import { Progress, Tab, Tabs } from '@nextui-org/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const items: { postfix: string; title: string; icon: string }[] = [
	{
		postfix: '',
		title: 'Thông tin',
		icon: 'bx bx-building',
	},
	{
		postfix: '/jobs',
		title: 'Việc làm',
		icon: 'bx bx-briefcase-alt',
	},
	{
		postfix: '/staffs',
		title: 'Nhân viên',
		icon: 'bx bx-group',
	},
	{
		postfix: '/edit',
		title: 'Cài đặt',
		icon: 'bx bx-cog',
	},
];

export default function CompanyTabs() {
	const { id } = useParams() as unknown as IdInParams;
	const router = useRouter();
	const pathname = usePathname();
	const user = useSelector((state: RootState) => state.user);

	const { data: company, isLoading } = useQuery(['company', { id }], () => companyService.getCompanyById(id));

	if (isLoading) return <Progress size='sm' isIndeterminate aria-label='Loading...' className='w-full' />;

	return (
		<div className='mx-auto w-[1280px] max-w-[95%]'>
			{user?.id === company?.id && (
				<Tabs
					selectedKey={pathname}
					className='mt-4'
					color='primary'
					size='lg'
					onSelectionChange={(value) => router.push(value as string)}
				>
					{items.map((item) => (
						<Tab
							value={`/companies/${id}${item.postfix}`}
							key={`/companies/${id}${item.postfix}`}
							title={
								<div className='flex gap-1 items-center'>
									<i className={item.icon}></i>
									<span>{item.title}</span>
								</div>
							}
						/>
					))}
				</Tabs>
			)}
		</div>
	);
}
