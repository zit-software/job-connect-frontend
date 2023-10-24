'use client';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CompanySection from '@/components/company/CompanySection';
import EmptyMessage from '@/components/emty-message';
import JobItem from '@/components/job-item';
import { CompanySize } from '@/constant';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import jobService from '@/services/job.service';
import urlService from '@/services/url.service';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Chip } from '.';

const LocationMap = dynamic(() => import('@/components/company/LocationMap'));

function Contact({ address }: { address: string }) {
	const position: LatLngExpression = {
		lat: 51.505,
		lng: -0.09,
	};
	return (
		<div className='px-5'>
			<div className=' border-b-1 pb-4'>
				<h3 className='font-semibold my-2'>
					<i className='bx bx-navigation'></i>
					<span className='mx-3'>Địa chỉ công ty</span>
				</h3>
				<p className=' text-gray-500'>{address}</p>
			</div>

			<div className=' border-b-1 pb-4'>
				<h3 className='font-semibold my-2'>
					<i className='bx bxs-map-alt'></i>
					<span className='mx-3'>Xem bản đồ</span>
				</h3>

				<LocationMap position={position} height='h-[400px]' />
			</div>
		</div>
	);
}

export default async function CompanyDetailPage({ params: { id } }: { params: { id: number } }) {
	const company = await companyService.getCompanyById(id);
	const jobs = await jobService.getJobsByCompanyId(id);

	return (
		<>
			<div className='w-[1280px] max-w-[95%] mx-auto my-5'>
				<header className='grid grid-cols-12'>
					<div className='col col-span-12 shadow-lg rounded-2xl relative overflow-hidden'>
						<div
							className='w-full relative bg-center bg-no-repeat bg-cover bg-gray-100'
							style={{
								aspectRatio: 3,
								backgroundImage: `url(${fileService.getFileUrl(company.banner)})`,
							}}
						></div>

						<div className='bg-gradient-to-l from-violet-500 to-blue-500 w-full p-4 flex gap-2'>
							<img
								src={fileService.getFileUrl(company.image)}
								className='bg-gray-100 rounded-full relative bottom-0 -mt-20 w-40 aspect-square border-4 border-white'
							/>
							<div className='flex-1'>
								<h1 className='text-2xl font-bold text-white'>{company.name}</h1>

								<div className='flex justify-between items-center'>
									<div className='flex gap-2'>
										<Link href={urlService.getExternalUrl(company.url)} target='_blank'>
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
											startContent={<i className='bx bxs-group'></i>}
										>
											{CompanySize[company.companySize as keyof typeof CompanySize]} nhân viên
										</Chip>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className='grid grid-cols-12 gap-4 my-5'>
					<div className='col-span-8'>
						<CompanySection header='Giới thiệu công ty' icon={<i className='bx bx-building'></i>}>
							<div className='p-5'>{company.description}</div>
						</CompanySection>
						<CompanySection header='Tuyển dụng' icon={<i className='bx bx-briefcase'></i>} transparent>
							<div className='py-5 grid grid-cols-1 gap-2'>
								{jobs.map((job) => (
									<JobItem job={job} key={job.id} />
								))}

								{!jobs.length && <EmptyMessage message='Hiện công ty này chưa đăng tin tuyển dụng' />}
							</div>
						</CompanySection>
					</div>
					<div className='col-span-4'>
						<CompanySection header='Thông tin liên hệ' icon={<i className='bx bx-phone'></i>}>
							<Contact address={company.address} />
						</CompanySection>
					</div>
				</div>
			</div>
		</>
	);
}
