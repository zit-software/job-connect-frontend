'use client';
import jobProposalLottie from '@/assets/lotties/job-proposal.json';
import CompanyCard from '@/components/company/CompanyCard';
import { CompanySize } from '@/constant';
import { Company } from '@/models/Company';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Input, Spinner, Tab, Tabs } from '@nextui-org/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './companies.css';
function Companies() {
	const [selectedTab, setSelectedTabs] = useState('all');
	const [search, setSearch] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [autoAnimateParent] = useAutoAnimate();

	const router = useRouter();
	const handleClick = (id: number) => {
		router.push(`/companies/${id}`);
	};

	const mockedCompanies: Company[] = [
		{
			id: 1,
			name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
			address: 'TP. Cần Thơ',
			image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
			banner: 'https://github.com/zit-software.png',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			companySize: CompanySize.FIVE_HUNDRED,
			mapPosition: '',
			url: '',
		},
		{
			id: 2,
			name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
			address: 'TP. Cần Thơ',
			image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
			banner: 'https://github.com/zit-software.png',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			companySize: CompanySize.FIVE_HUNDRED,
			mapPosition: '',
			url: '',
		},
		{
			id: 3,
			name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
			address: 'TP. Cần Thơ',
			image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
			banner: 'https://github.com/zit-software.png',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			companySize: CompanySize.FIVE_HUNDRED,
			mapPosition: '',
			url: '',
		},
	];
	return (
		<div className='container max-w-[95%] w-[1280px] mx-auto my-5'>
			<div className='grid grid-cols-12 bg-gradient-to-b rounded-2xl from-blue-200 to-blue-100 w-full p-10'>
				<div className='col-span-12 md:col-span-9'>
					<Tabs color='primary'>
						<Tab key='list' title='Danh sách công ty'></Tab>
						<Tab key='top' title='Top công ty'></Tab>
					</Tabs>
					<div className='mt-10'>
						<h1 className='mt-5 font-bold text-4xl title'>Khám phá vô vàn công ty thuộc lĩnh vực IT!</h1>
						<p className='my-2 font-size-2xl'>Tìm hiểu các công ty phù hợp dành cho bạn.</p>
						<Input
							placeholder='Công Ty TNHH...'
							variant='flat'
							size='lg'
							className='flex-1'
							startContent={<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>}
							endContent={isSearching && <Spinner />}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</div>
				</div>
				<div className=' hidden md:col-span-3 md:block'>
					<Lottie animationData={jobProposalLottie} className='aspect-square' />
				</div>
			</div>
			<div className='container max-w[1280px]'>
				<div ref={autoAnimateParent} className='grid grid-cols-12 gap-4 mt-5'>
					{mockedCompanies.map((company) => (
						<div key={company.id} className='col-span-12 sm:col-span-6 md:col-span-3'>
							<CompanyCard company={company}></CompanyCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default Companies;
