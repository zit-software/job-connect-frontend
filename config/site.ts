export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + NextUI',
	description:
		'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'About',
			href: '/about',
		},
	],
	navMenuItems: [],
	links: {
		github: 'https://github.com/zit-software',
		facebook: 'https://www.facebook.com/zit.software/',
	},
};
