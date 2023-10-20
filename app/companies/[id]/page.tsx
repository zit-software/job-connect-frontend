'use client';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CompanySection from '@/components/company/CompanySection';
import { CompanySize } from '@/constant';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import IdInParams from '@/types/IdInParams';
import { Button, Chip } from '@nextui-org/react';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const LocationMap = dynamic(() => import('@/components/company/LocationMap'));

export function Contact({ address }: { address: string }) {
	const position: LatLngExpression = {
		lat: 51.505,
		lng: -0.09,
	};
	return (
		<div className='p-5'>
			<div className=' border-b-1 pb-4'>
				<div>
					<i className='bx bxs-map'></i>
					<span className='mx-3'>Địa chỉ công ty</span>
				</div>
				<p className=' text-gray-500'>{address}</p>
			</div>

			<div className=' border-b-1 pb-4'>
				<div>
					<i className='bx bxs-map-alt'></i>
					<span className='mx-3'>Xem bản đồ</span>
					<LocationMap position={position} height='h-[400px]' />
				</div>
			</div>
		</div>
	);
}

export default async function CompanyDetailPage() {
	const { id } = useParams() as unknown as IdInParams;

	const company = await companyService.getCompanyById(id);

	return (
		<>
			<div className='w-[1280px] max-w-[95%] mx-auto my-5'>
				<header className='grid grid-cols-12'>
					<div className='col col-span-12 shadow-lg rounded-2xl relative overflow-hidden'>
						<div
							className='w-full relative bg-center bg-no-repeat bg-cover'
							style={{
								aspectRatio: 3,
								backgroundImage: `url(${fileService.getFileUrl(company.banner)})`,
							}}
						></div>

						<div className='bg-gradient-to-l from-violet-500 to-blue-500 w-full p-4 flex gap-2'>
							<img
								src={fileService.getFileUrl(company.image)}
								className='rounded-full relative bottom-0 -mt-20 w-40 aspect-square border-4 border-white'
							/>
							<div className='flex-1'>
								<h1 className='text-2xl font-bold text-white'>{company.name}</h1>
								<div className='flex justify-between items-center'>
									<div className='flex gap-2'>
										<Link href={company.url} target='_blank'>
											<Chip
												variant='light'
												className='text-white'
												startContent={<i className='bx bx-globe'></i>}
											>
												{company.url}
											</Chip>
										</Link>

										<Chip
											variant='light'
											className='text-white'
											startContent={<i className='bx bx-group'></i>}
										>
											{CompanySize[company.companySize as keyof typeof CompanySize]} nhân viên
										</Chip>
									</div>
									<Button
										size='md'
										className='bg-white text-blue-600 font-bold'
										startContent={<i className='bx bx-briefcase'></i>}
									>
										Xem Việc Làm
									</Button>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className='grid grid-cols-12 gap-4 my-5'>
					<div className='col-span-8'>
						<CompanySection header='Giới thiệu công ty'>
							<div className='p-5'>{company.description}</div>
						</CompanySection>
						<CompanySection header='Tuyển dụng'>
							<div className='p-5'></div>
						</CompanySection>
					</div>
					<div className='col-span-4'>
						<CompanySection header='Thông tin liên hệ'>
							{/* <Contact address={company.address} /> */}
						</CompanySection>
					</div>
				</div>
			</div>
		</>
	);
}
