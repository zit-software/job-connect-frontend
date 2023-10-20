import CompanyTabs from '@/components/companies/CompanyTabs';

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CompanyTabs />
			{children}
		</>
	);
}
