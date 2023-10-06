export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + NextUI',
	description:
		'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Việc làm',
			children: [
				{
					label: 'Tìm việc làm',
					href: '/jobs',
					icon: <i className='bx bx-search' />,
				},
				'|',
				{
					label: 'Việc làm đã ứng tuyển',
					href: '/applied-jobs',
					icon: <i className='bx bx-briefcase'></i>,
				},
				{
					label: 'Việc làm đã lưu',
					href: '/saved-jobs',
					icon: <i className='bx bx-bookmark'></i>,
				},
				'|',
				{
					label: 'Việc làm phù hợp',
					href: '/recommended-jobs',
					icon: <i className='bx bxs-magic-wand'></i>,
				},
			],
		},
		{
			label: 'Công ty',
			children: [
				{
					label: 'Danh sách công ty',
					href: '/companies',
					icon: <i className='bx bx-building'></i>,
				},
				{
					label: 'Top công ty',
					href: '/top-companies',
					icon: <i className='bx bxs-certification'></i>,
				},
			],
		},
	],
	links: {
		github: 'https://github.com/zit-software',
		facebook: 'https://www.facebook.com/zit.software/',
	},
};
