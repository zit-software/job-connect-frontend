'use client';

import { title } from '@/components/primitives';
import { Button, Divider } from '@nextui-org/react';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='w-[1280px] max-w-[95%] mx-auto py-10'>
			<h2 className={clsx(title({ color: 'orange' }))}>Đã xảy ra lỗi</h2>

			<Divider className='my-4' />

			<Button
				color='danger'
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Thử lại
			</Button>
		</div>
	);
}
