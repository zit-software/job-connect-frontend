import ErrorMessage from '@/components/ErrorMessage';
import CreateJob from '@/components/companies/CreateJob';
import JobList from '@/components/companies/jobList';
import jobService from '@/services/job.service';
async function Page({ params }: { params: { id: number } }) {
	try {
		const jobs = await jobService.getJobsByCompanyId(params.id);
		return (
			<div className='container max-w-[1280px] mx-auto'>
				<div>
					<div className='my-5 flex justify-end'>
						<CreateJob id={params.id} />
					</div>
					<div className='w-full my-5'>
						<JobList jobs={jobs} />
					</div>
				</div>
			</div>
		);
	} catch (error: any) {
		return <ErrorMessage message={error.message} />;
	}
}
export default Page;
