import { Card, CardBody, CardHeader, Chip, Divider, Image } from '@nextui-org/react';
import Link from 'next/link';
export interface JobCardProps {
	jobId: number;
	companyImage: string;
	title: string;
	companyName: string;
	address: string;
	skills: string[];
	workType: string;
	minSalary: number;
	maxSalary: number;
}
function HotJob(props: JobCardProps) {
	return (
		<>
			<Link
				href={`/jobs/${props.jobId}`}
				className='p-2 bg-gradient-to-tr from-red-500 to-orange-400 block rounded-2xl relative'
			>
				<div className='w-10 h-full bg-white absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-25 skew-x-12'></div>

				<div className='w-5 h-full bg-white absolute left-1/3 top-0 -translate-x-1/2 bg-opacity-25 skew-x-12'></div>

				<Card className='px-2 shadow-none border-none'>
					<CardHeader className='flex gap-5'>
						<Image alt='nextui logo' height={40} radius='sm' src={props.companyImage} width={40} />
						<div className='flex flex-col'>
							<h2 className='text-md font-bold text-orange-500 mb-2'>
								<Chip
									classNames={{
										content: 'text-white font-bold',
									}}
									color='warning'
									size='sm'
									className='mr-2'
								>
									{props.workType}
								</Chip>
								{props.title}
							</h2>
							<p className='text-small text-default-500'>{props.companyName}</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<div className='flex flex-wrap gap-1'>
							{props.skills.map((skill, index) => (
								<Chip key={index} variant='flat' color='warning' size='sm'>
									{skill}
								</Chip>
							))}
						</div>
					</CardBody>
				</Card>
			</Link>
		</>
	);
}

export default HotJob;
