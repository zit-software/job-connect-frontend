import { Progress } from '@nextui-org/react';

export default function PageLoading() {
	return <Progress isIndeterminate className='w-full' size='sm' aria-label='Loading...' />;
}
