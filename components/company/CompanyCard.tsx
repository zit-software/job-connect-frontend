/* eslint-disable @next/next/no-img-element */
import { Company } from '@/models/Company';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface CompanyCardProps {
	company: Company;
}
function CompanyCard(props: CompanyCardProps) {
	const router = useRouter();
	const handleClick = (id: number) => {
		console.log(id);
		router.push(`/companies/${id}`);
	};
	return (
		<Card
			isHoverable
			isPressable
			onPress={() => handleClick(props.company.id)}
			className='cursor-pointer'
		>
			<CardHeader className='h-[100px] md:h-[220px]'>
				<div className='relative w-full'>
					<img
						className='w-full max-h-[200px] object-cover rounded-2xl'
						src={props.company.banner}
						alt='company logo'
					/>
					<img
						className='w-24 h-24 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-white'
						src={props.company.image}
						alt='company logo'
					/>
				</div>
			</CardHeader>
			<CardBody className='mt-5'>
				<div>
					<h1 className='text-size-2xl font-bold'>
						{props.company.name}
					</h1>
					<p className='address'>{props.company.address}</p>
					<p className='company-description'>
						{/* {props.company.description} */}
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Quae provident nemo harum aperiam est veniam
						mollitia ut reprehenderit eveniet consequuntur sed
						blanditiis tempore necessitatibus saepe voluptatem,
						suscipit, omnis neque dolore quam doloremque rem earum
						doloribus? Fuga consectetur maxime possimus. Atque rem
						magnam qui corporis quia minima placeat blanditiis
						doloremque aliquam ipsam nostrum eos odit, praesentium
						enim excepturi ipsum dolor ut distinctio maxime! Ullam
						quod corrupti adipisci deleniti dolores, optio
						reiciendis sint, voluptas, harum nemo beatae repudiandae
						perspiciatis! Repudiandae nam iusto ipsam ut. Vero id
						provident fuga ut delectus laborum incidunt maiores
						nesciunt. Eius corporis animi quo placeat, aut totam
						voluptatum neque assumenda vitae nemo eveniet saepe
						delectus tenetur at veniam exercitationem obcaecati
						commodi sunt molestiae repellendus illum. Voluptates
						iure nesciunt, hic doloribus porro, perspiciatis laborum
						sequi eum temporibus nisi suscipit ratione nulla
						explicabo alias tempora numquam pariatur voluptatum?
						Esse minus earum error ut omnis praesentium aspernatur,
						provident iste dolorum necessitatibus libero nesciunt,
						labore unde eius a ipsam repellat. Molestiae ipsum nam
						at ea ex ratione aliquid quae quasi distinctio quod,
						unde repellendus alias blanditiis commodi ut delectus
						cum molestias enim aspernatur consequatur quas facere
						dolore eveniet? Obcaecati sit voluptates illum labore
						tenetur autem suscipit accusamus. Facere officia soluta
						voluptatibus illum.
					</p>
				</div>
			</CardBody>
			<CardFooter></CardFooter>
		</Card>
	);
}

export default CompanyCard;
