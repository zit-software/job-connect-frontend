'use client';

import ErrorMessage from '@/components/ErrorMessage';
import PageLoading from '@/components/PageLoader';
import CreateJob from '@/components/companies/CreateJob';
import JobList from '@/components/companies/jobList';
import jobService from '@/services/job.service';
import { useQuery } from 'react-query';

async function Page({ params }: { params: { id: number } }) {
	const {
		data: jobs,
		isLoading,
		error,
	} = useQuery(['jobs', 'companyId', params.id], () => jobService.getJobsByCompanyId(params.id));

	if (isLoading) return <PageLoading />;

	if (!jobs) return <ErrorMessage message={(error as any).message} />;

	return (
		<div className='container w-[1280px] max-w-[95%] mx-auto'>
			<div>
				<div className='my-2 flex justify-end'>
					<CreateJob id={params.id} />
				</div>
				<div className='w-full my-5'>
					<JobList jobs={jobs} />
				</div>
			</div>
		</div>
	);
}
export default Page;
