import { Card, CardHeader, CardBody, CardFooter, Image, Divider, Chip, Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faFile, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { formatVndMoney } from '@/utils/common';
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
function JobCard(props: JobCardProps) {
	return (
		<Card>
			<CardHeader className='flex gap-3'>
				<Image alt='nextui logo' height={40} radius='sm' src={props.companyImage} width={40} />
				<div className='flex flex-col'>
					<p className='text-md'>{props.title}</p>
					<p className='text-small text-default-500'>{props.companyName}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='flex gap-2'>
					<div className='border-r-1 p-2 flex align-middle flex-col'>
						<Chip
							classNames={{
								base: 'bg-gradient-to-br from-blue-300 to-blue-500 border-small border-white/50 shadow-blue-200',
								content: 'drop-shadow shadow-black text-white',
							}}
							variant='shadow'
						>
							{props.workType}
						</Chip>
					</div>
					<div className='flex justify-center align-middle flex-wrap gap-2'>
						{props.skills.map((skill, index) => (
							<Chip key={index}>{skill}</Chip>
						))}
					</div>
				</div>
			</CardBody>
			<CardFooter>
				<div className='flex justify-end w-full'>
					<Button variant='light' color='primary' size='sm'>
						Chi tiết
						<FontAwesomeIcon icon={faCircleInfo} />
					</Button>
					<Button variant='light' color='primary' className='ms-2' size='sm'>
						Ứng tuyển
						<FontAwesomeIcon icon={faFile} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}

export default JobCard;
