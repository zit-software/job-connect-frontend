/* eslint-disable @next/next/no-img-element */
import logo from '@/assets/images/logo.png';
import Link from 'next/link';

export default function AppFooter() {
	return (
		<div className='w-full min-h-96 bg-gray-900 mt-12 text-white'>
			<div className='w-[1280px] max-w-[95%] mx-auto py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<div className='col-span-1'>
						<div className='flex gap-4 items-start'>
							<img src={logo.src} alt='ZIT Software' className='w-16 aspect-square rounded-lg' />

							<div>
								<h2 className='text-medium font-bold'>Job Connect</h2>
								<p className='text-sm font-normal opacity-60'>
									Sản phẩm được phát triển và phát hành bởi{' '}
									<strong className='font-medium'>ZIT Software</strong>
								</p>
							</div>
						</div>
					</div>

					<div className='col-span-1'>
						<h3 className='font-bold uppercase mb-2'>Giới thiệu</h3>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Về Job Connect
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Điều khoản sử dụng
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Chính sách bảo mật
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Miễn trừ trách nhiệm
						</Link>
					</div>

					<div className='col-span-1'>
						<h3 className='font-bold uppercase mb-2'>Kết nối</h3>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Linkedin
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Github
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Facebook
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							Tiktok
						</Link>
					</div>

					<div className='col-span-1'>
						<h3 className='font-bold uppercase mb-2'>Liên hệ</h3>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							root@thangved.com
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							+(84)123456789
						</Link>

						<Link href='#' className='text-sm py-1 block opacity-80'>
							localhost, TP. Cần Thơ
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
