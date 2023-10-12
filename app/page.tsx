'use client';

import Carousel from 'react-multi-carousel';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

export default function Home() {
	return (
		<div className='container mx-auto max-w-[1280px]'>
			<Carousel responsive={responsive} className='my-4 -mx-2'>
				<div className='px-2'>
					<div className='h-64 bg-gradient-to-tr from-blue-500 to-green-500 rounded-xl'></div>
				</div>

				<div className='px-2'>
					<div className='h-64 bg-gradient-to-tr from-red-500 to-yellow-500 rounded-xl'></div>
				</div>

				<div className='px-2'>
					<div className='h-64 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-xl'></div>
				</div>

				<div className='px-2'>
					<div className='h-64 bg-gradient-to-tr from-red-500 to-red-700 rounded-xl'></div>
				</div>

				<div className='px-2'>
					<div className='h-64 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-xl'></div>
				</div>
			</Carousel>
		</div>
	);
}
