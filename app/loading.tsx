import { Spinner } from '@nextui-org/react';

export default function Loading() {
	return (
		<div className='fixed bg-background bg-opacity-25 tp-0 left-0 right-0 bottom-0 flex items-center justify-center'>
			<Spinner />
		</div>
	);
}
