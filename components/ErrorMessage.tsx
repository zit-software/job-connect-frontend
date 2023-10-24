'use client';

import { Lottie } from '@/app/jobs/[id]';
import empty from '@/assets/lotties/empty.json';

export default function ErrorMessage({ message }: { message: string }) {
	return (
		<div className='flex items-center flex-col mt-5'>
			<Lottie animationData={empty} className='w-64 max-w-full' />
			<h3 className='text-center font-bold'>{message}</h3>
		</div>
	);
}
