import emptyLottie from '@/assets/lotties/empty.json';
import Lottie from 'lottie-react';

export interface EmptyMessageProps {
	message?: string;
}

export default function EmptyMessage({ message }: EmptyMessageProps) {
	return (
		<div className='flex flex-col items-center gap-3'>
			<Lottie animationData={emptyLottie} className='w-64 max-w-full aspect-square' />

			<h3 className='text-center'>{message}</h3>
		</div>
	);
}
