'use client';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import springWorkshop from '@/assets/images/spring-workshop.png';
import CompanySection from '@/components/company/CompanySection';
import { Button, Chip } from '@nextui-org/react';
import './company-detail.css';
import Head from 'next/head';

function Contact({ address }: { address: string }) {
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
				</div>
			</div>
		</div>
	);
}

async function CompanyDetail() {
	const company = {
		id: 1,
		name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
		address: 'localhost, Thành phố Cần Thơ',
		image: 'https://github.com/zit-software.png',
		banner: springWorkshop.src,
		description: '',
		owner: {
			id: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return (
		<>
			<Head>
				<title>{company.name}</title>
			</Head>
			<div className='container max-w-[1280px] mx-auto my-5'>
				<header className='grid grid-cols-12'>
					<div className='col col-span-12 shadow-lg rounded-2xl overflow-hidden'>
						<div className='w-full h-[200px] relative'>
							<img
								className='w-full h-full object-cover'
								src={company.banner}
							/>
							<img
								src={company.image}
								className='rounded-full absolute left-5 bottom-0 translate-y-1/2 transform w-40 h-40 border-4 border-white'
							/>
						</div>

						<div className='bg-gradient-to-l from-violet-500 to-blue-500 w-full p-5 pl-[200px]'>
							<h1 className='text-2xl font-bold text-white'>
								{company.name}
							</h1>
							<div className='flex justify-between items-center'>
								<div className='flex gap-2'>
									<Chip
										variant='light'
										className='text-white'
										startContent={
											<i className='bx bx-globe'></i>
										}
									>
										http://zit-software.com
									</Chip>

									<Chip
										variant='light'
										className='text-white'
										startContent={
											<i className='bx bx-globe'></i>
										}
									>
										1000+ nhân viên
									</Chip>
								</div>
								<Button
									size='md'
									className='bg-white text-blue-600 font-bold'
									startContent={
										<i className='bx bx-briefcase'></i>
									}
								>
									Xem Việc Làm
								</Button>
							</div>
						</div>
					</div>
				</header>

				<div className='grid grid-cols-12 gap-10 my-5'>
					<div className='col-span-8'>
						<CompanySection header='Giới thiệu công ty'>
							<div className='p-5'>
								{/* {company.description} */}
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Molestiae accusamus ullam
								laudantium sapiente perferendis esse laborum
								error quidem ipsum. Nulla, ipsa quibusdam
								officia amet necessitatibus sit, harum maxime in
								animi earum exercitationem architecto minus
								doloremque vel excepturi minima. Delectus ipsa
								earum, harum, libero rem illo voluptatum quas
								debitis, omnis perspiciatis ex! Ratione sint
								cupiditate vel, quasi dolorum placeat aperiam
								sequi corporis beatae temporibus sapiente ea
								voluptatem mollitia! Similique tempora nostrum
								autem perspiciatis reprehenderit non sint unde
								neque dolorem aliquam placeat modi quibusdam
								perferendis debitis est assumenda earum, maiores
								nisi quis. Aliquid accusantium labore veritatis
								ipsa eligendi eaque iusto esse voluptatem!
							</div>
						</CompanySection>
						<CompanySection header='Tuyển dụng'>
							<div className='p-5'></div>
						</CompanySection>
					</div>
					<div className='col-span-4'>
						<CompanySection header='Thông tin liên hệ'>
							<Contact address={company.address} />
						</CompanySection>
					</div>
				</div>
			</div>
		</>
	);
}
export default CompanyDetail;
