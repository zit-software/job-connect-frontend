'use client';

import { Chip } from '@nextui-org/react';

/* eslint-disable @next/next/no-img-element */
export default function JobItem() {
	return (
		<a
			href='#'
			className='flex px-4 py-8 gap-4 cursor-pointer bg-background rounded-lg border transition hover:shadow-lg'
		>
			<img
				src='https://github.com/zit-software.png'
				alt='Avatar'
				className='rounded-lg w-24 h-24'
			/>

			<div className='flex-1 flex flex-col'>
				<h3 className='font-bold text-large text-default-700'>
					(Gấp) Lập trình viên Frontend
				</h3>

				<p className='text-default-600 text-small'>
					Công ty TNHH Công nghệ phần mềm ZIT (ZIT Software)
				</p>

				<div className='flex-1'></div>

				<div className='flex gap-2 flex-wrap'>
					<Chip
						color='primary'
						startContent={<i className='bx bx-dollar'></i>}
					>
						10M - 15M VNĐ
					</Chip>

					<Chip
						variant='flat'
						startContent={<i className='bx bx-map-pin'></i>}
					>
						TP. Cần Thơ
					</Chip>

					<Chip
						variant='flat'
						startContent={<i className='bx bx-user'></i>}
					>
						Remote
					</Chip>
				</div>
			</div>
		</a>
	);
}
