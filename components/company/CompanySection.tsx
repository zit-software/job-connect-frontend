interface CompanySectionProps {
	header: String;
	children: React.ReactNode;
}
function CompanySection(props: CompanySectionProps) {
	return (
		<div className='rounded-2xl shadow-lg overflow-hidden my-3'>
			<div className='bg-blue-400 p-3'>
				<h1 className='text-lg font-bold italic text-white'>
					{props.header}
				</h1>
			</div>
			<div>{props.children}</div>
		</div>
	);
}
export default CompanySection;
