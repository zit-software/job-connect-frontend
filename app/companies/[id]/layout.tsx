import CompanyTabs from '@/components/companies/CompanyTabs';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CompanyTabs />
			{children}
		</>
	);
}
