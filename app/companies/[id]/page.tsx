/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import CompanySection from '@/components/company/CompanySection';
import { Company } from '@/models/Company';
import companyService from '@/services/company.service';
import { faLocationDot, faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './company-detail.css';

function Contact({ address }: { address: string }) {
	return (
		<div className='p-5'>
			<div className=' border-b-1 pb-4'>
				<div>
					<FontAwesomeIcon icon={faLocationDot} />
					<span className='mx-3 italic'>Địa chỉ công ty</span>
				</div>
				<p className=' text-gray-500'>{address}</p>
			</div>

			<div className=' border-b-1 pb-4'>
				<div>
					<FontAwesomeIcon icon={faMap} />
					<span className='mx-3 italic'>Xem bản đồ</span>
				</div>
			</div>
		</div>
	);
}

function CompanyDetail() {
	const [company, setCompany] = useState<Company>({
		id: 1,
		name: 'Công Ty TNHH Công Nghệ Phần Mềm ZIT Software',
		address: 'B3-10, Đường số 3, KDC Long Thịnh, Thành phố Cần Thơ',
		image: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
		banner: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/358423867_147146435061607_5362565494737813228_n.png?_nc_cat=107&ccb=1-7&_nc_sid=52f669&_nc_ohc=uAgpMF5sEU0AX91MuJ3&_nc_ht=scontent.fsgn2-3.fna&_nc_e2o=s&oh=00_AfC2bMW-4i9VkVT294k0A_0b6hBt3JxNMJ_Tqcw5Fd5Fbg&oe=652D1DD8',
		description: '',
		owner: {
			id: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const response = await companyService.getCompanyById(id as string);
			setCompany(response.data);
			setIsLoading(false);
		})();
	}, [id]);
	return (
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

					<div className='bg-gradient-to-l from-violet-500 to-blue-500 w-full p-10 pl-[250px]'>
						<h1 className='text-2xl font-bold text-white'>
							{company.name}
						</h1>
						<div className='flex justify-between'>
							<div className='flex gap-3'>
								<p className='text-white text-md italic leading-[44px]'>
									http://zit-software.com
								</p>
								<p className='text-white text-md italic leading-[44px]'>
									1000+ nhân viên
								</p>
							</div>
							<Button
								size='lg'
								className='bg-white text-blue-600 font-bold'
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
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Molestiae accusamus ullam laudantium sapiente
							perferendis esse laborum error quidem ipsum. Nulla,
							ipsa quibusdam officia amet necessitatibus sit,
							harum maxime in animi earum exercitationem
							architecto minus doloremque vel excepturi minima.
							Delectus ipsa earum, harum, libero rem illo
							voluptatum quas debitis, omnis perspiciatis ex!
							Ratione sint cupiditate vel, quasi dolorum placeat
							aperiam sequi corporis beatae temporibus sapiente ea
							voluptatem mollitia! Similique tempora nostrum autem
							perspiciatis reprehenderit non sint unde neque
							dolorem aliquam placeat modi quibusdam perferendis
							debitis est assumenda earum, maiores nisi quis.
							Aliquid accusantium labore veritatis ipsa eligendi
							eaque iusto esse voluptatem!
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
	);
}
export default CompanyDetail;
