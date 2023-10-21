'use client';

import { Lottie } from '@/app/jobs/[id]';
import empty from '@/assets/lotties/empty.json';

export default function ErrorMessage({ message }: { message: string }) {
	return (
		<div className='flex items-center flex-col mt-5'>
			<h1 className='text-2xl text-center font-bold'>{message}</h1>
			<Lottie animationData={empty} className='w-[350px]' />
		</div>
	);
}
