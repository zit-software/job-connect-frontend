'use client';
import jobProposalLottie from '@/assets/lotties/job-proposal.json';
import Lottie from 'lottie-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import './companies.css';
import { Input, Spinner } from '@nextui-org/react';
import { Company } from '@/models/Company';
import CompanyCard from '@/components/company/CompanyCard';
import { useRouter } from 'next/navigation';
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
			banner: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/358423867_147146435061607_5362565494737813228_n.png?_nc_cat=107&ccb=1-7&_nc_sid=52f669&_nc_ohc=uAgpMF5sEU0AX91MuJ3&_nc_ht=scontent.fsgn2-3.fna&_nc_e2o=s&oh=00_AfC2bMW-4i9VkVT294k0A_0b6hBt3JxNMJ_Tqcw5Fd5Fbg&oe=652D1DD8',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: 2,
			name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
			address: 'TP. Cần Thơ',
			image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
			banner: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/358423867_147146435061607_5362565494737813228_n.png?_nc_cat=107&ccb=1-7&_nc_sid=52f669&_nc_ohc=uAgpMF5sEU0AX91MuJ3&_nc_ht=scontent.fsgn2-3.fna&_nc_e2o=s&oh=00_AfC2bMW-4i9VkVT294k0A_0b6hBt3JxNMJ_Tqcw5Fd5Fbg&oe=652D1DD8',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: 3,
			name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
			address: 'TP. Cần Thơ',
			image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
			banner: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/358423867_147146435061607_5362565494737813228_n.png?_nc_cat=107&ccb=1-7&_nc_sid=52f669&_nc_ohc=uAgpMF5sEU0AX91MuJ3&_nc_ht=scontent.fsgn2-3.fna&_nc_e2o=s&oh=00_AfC2bMW-4i9VkVT294k0A_0b6hBt3JxNMJ_Tqcw5Fd5Fbg&oe=652D1DD8',
			description: 'Công ty ZIT Software',
			owner: {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];
	return (
		<div className='container max-w-[1440px] mx-auto my-5'>
			<div className='grid grid-cols-12 bg-gradient-to-b rounded-2xl from-blue-200 to-blue-100 w-full p-10'>
				<div className='col-span-12 md:col-span-9'>
					<div className='flex w-[300px] justify-center'>
						<a
							onClick={() => setSelectedTabs('all')}
							className={
								selectedTab == 'all' ? 'mx-2 selected' : 'mx-2'
							}
						>
							Danh sách công ty
						</a>
						<a
							onClick={() => setSelectedTabs('top')}
							className={
								selectedTab == 'top' ? 'mx-2 selected' : 'mx-2'
							}
						>
							Top công ty
						</a>
					</div>
					<div className='mt-10'>
						<h1 className='mt-5 font-bold bg-gradient-to-r text-4xl title'>
							Khám phá vô vàn công ty thuộc lĩnh vực IT!
						</h1>
						<p className='my-2 italic font-size-2xl'>
							Tìm hiểu các công ty phù hợp dành cho bạn.
						</p>
						<Input
							placeholder='Công Ty TNHH...'
							variant='flat'
							size='lg'
							className='flex-1'
							startContent={
								<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>
							}
							endContent={isSearching && <Spinner />}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</div>
				</div>
				<div className=' hidden md:col-span-3 md:block'>
					<Lottie
						animationData={jobProposalLottie}
						className='aspect-square'
					/>
				</div>
			</div>
			<div className='container max-w[1280px]'>
				<div
					ref={autoAnimateParent}
					className='grid grid-cols-12 gap-4 mt-5'
				>
					{mockedCompanies.map((company) => (
						<div
							key={company.id}
							className='col-span-12 sm:col-span-6 md:col-span-3'
						>
							<CompanyCard company={company}></CompanyCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default Companies;
