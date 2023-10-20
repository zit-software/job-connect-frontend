'use client';
import bussinessLottie from '@/assets/lotties/bussiness.json';
import empty from '@/assets/lotties/empty.json';
import AddCompanyModal from '@/components/my-companies/AddCompanyModal';
import { title } from '@/components/primitives';
import { CompanySize } from '@/constant';
import useRouteGuard from '@/hooks/useRouteGuard';
import { Company } from '@/models/Company';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import { formatLongText } from '@/utils/common';
import {
	Avatar,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from '@nextui-org/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function MyCompanies() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
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
		<>
			<div className='w-full py-20 bg-gradient-to-tr from-red-100 to-orange-200'>
				<div className='w-[1280px] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2'>
					<div className='col-span-1 aspect-square'>
						<Lottie animationData={bussinessLottie} />
					</div>
					<div className='col-span-2'>
						<h2 className={clsx(title({ color: 'orange' }))}>Doanh nghiệp của bạn tại Job Connect</h2>

						<p className='my-4 text-default-600 text-lg text-justify'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nihil possimus cum
							nobis iure, quas ipsum, nesciunt, odit voluptate exercitationem corporis quibusdam quisquam
							debitis veritatis non ratione voluptatem sapiente vel!
						</p>

						<Button
							size='lg'
							color='warning'
							startContent={<i className='bx bx-building'></i>}
							onClick={onOpen}
						>
							Tạo Công ty
						</Button>
					</div>
				</div>
			</div>

			<div className='container max-w-[1280px] mx-auto my-5 relative'>
				<h1 className='text-3xl font-bold my-4'>Công Ty Của Bạn</h1>

				<div>
					{companies?.length > 0 ? (
						<Table aria-label='My companies'>
							<TableHeader>
								<TableColumn>{''}</TableColumn>
								<TableColumn>Tên</TableColumn>
								<TableColumn>Địa chỉ</TableColumn>
								<TableColumn>Quy mô</TableColumn>
								<TableColumn>Trang web</TableColumn>
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
											<Avatar src={fileService.getFileUrl(company.image)} size='md' />
										</TableCell>

										<TableCell className='font-bold'>{company.name}</TableCell>

										<TableCell>{company.address}</TableCell>

										<TableCell>
											{CompanySize[company.companySize as keyof typeof CompanySize]} nhân viên
										</TableCell>

										<TableCell>
											<Link href={company.url} target='_blank'>
												<Chip
													startContent={<i className='bx bx-globe'></i>}
													color='primary'
													variant='bordered'
												>
													{company.url}
												</Chip>
											</Link>
										</TableCell>

										<TableCell>{formatLongText(company.description)}</TableCell>

										<TableCell>
											<div className='flex gap-2'>
												<Link href={`/companies/${company.id}/edit`}>
													<Button isIconOnly>
														<i className='bx bx-edit'></i>
													</Button>
												</Link>

												<Link href={`/companies/${company.id}`}>
													<Button isIconOnly>
														<i className='bx bx-globe'></i>
													</Button>
												</Link>
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
				<AddCompanyModal isOpen={isOpen} onOpenChange={onClose} />
			</div>
		</>
	);
}
export default MyCompanies;
