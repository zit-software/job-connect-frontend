'use client';
import empty from '@/assets/lotties/empty.json';
import AddCompanyModal from '@/components/my-companies/AddCompanyModal';
import { CompanySize } from '@/constant';
import useRouteGuard from '@/hooks/useRouteGuard';
import { Company } from '@/models/Company';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import { formatLongText } from '@/utils/common';
import { Avatar, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
function MyCompanies() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const user = useRouteGuard();
	const router = useRouter();
	useEffect(() => {
		if (!user) return;
		async function getCompanies() {
			const allCompanies = await companyService.getSelfCompany();
			setCompanies(allCompanies);
		}
		getCompanies();
	}, [user]);
	const updateCompany = (company: Company) => {
		router.push(`/companies/update/${company.id}`);
	};
	const viewCompany = (company: Company) => {
		router.push(`/companies/${company.id}`);
	};
	return (
		<div className='container max-w-[1280px] mx-auto my-5 relative'>
			<div className='flex gap-5'>
				<h1 className='text-3xl italic'>Công Ty Của Bạn</h1>
				<Button onClick={() => setIsOpen(true)} color='primary'>
					Tạo công ty
				</Button>
			</div>
			<div>
				{companies?.length > 0 ? (
					<Table aria-label='My companies'>
						<TableHeader>
							<TableColumn>Công Ty</TableColumn>
							<TableColumn>Tên</TableColumn>
							<TableColumn>Địa chỉ</TableColumn>
							<TableColumn>Quy mô</TableColumn>
							<TableColumn>URL</TableColumn>
							<TableColumn>Mô tả</TableColumn>
							<TableColumn>Hành động</TableColumn>
						</TableHeader>
						<TableBody>
							{companies.map((company) => (
								<TableRow
									className='hover:bg-[#e9e8e8] relative cursor-pointer transition-all '
									onDoubleClick={() => {
										viewCompany(company);
									}}
									key={company.id}
								>
									<TableCell>
										{company.image ? (
											<Avatar src={fileService.getFileUrl(company.image)} size='md' />
										) : (
											<p className='italic'>Chưa có logo</p>
										)}
									</TableCell>
									<TableCell>{company.name}</TableCell>
									<TableCell>{company.address}</TableCell>
									<TableCell>
										{CompanySize[company.companySize as keyof typeof CompanySize]} nhân viên
									</TableCell>
									<TableCell>
										<a className='underline text-blue-200' href={company.url}>
											{company.url}
										</a>
									</TableCell>
									<TableCell>{formatLongText(company.description)}</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<i
												onClick={() => updateCompany(company)}
												className='bx bxs-edit text-2xl cursor-pointer'
											></i>
											<i
												onClick={() => viewCompany(company)}
												className='bx bx-navigation text-2xl cursor-pointer'
											></i>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className='flex justify-center items-center flex-col'>
						<Lottie animationData={empty} className='w-[400px] max-w-[100%]' />
						<h1 className='text-2xl '>Bạn chưa có công ty nào</h1>
					</div>
				)}
			</div>
			<AddCompanyModal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} />
		</div>
	);
}
export default MyCompanies;
