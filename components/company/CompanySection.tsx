import clsx from 'clsx';

interface CompanySectionProps {
	header: String;
	children: React.ReactNode;
	icon?: React.ReactNode;
	transparent?: boolean;
}
function CompanySection(props: CompanySectionProps) {
	return (
		<div
			className={clsx('rounded-xl overflow-hidden my-3', {
				'bg-background': !props.transparent,
				border: !props.transparent,
			})}
		>
			<div
				className={clsx('bg-blue-500 p-3', {
					'rounded-xl': props.transparent,
				})}
			>
				<h1 className='flex items-center gap-2 text-lg font-bold text-white'>
					{props.icon}
					{props.header}
				</h1>
			</div>
			<div>{props.children}</div>
		</div>
	);
}
export default CompanySection;
