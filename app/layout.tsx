import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					'min-h-screen font-sans antialiased bg-blue-50',
					fontSans.variable,
				)}
			>
				<Providers
					themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
				>
					<div className='relative flex flex-col h-screen'>
						<Navbar />
						{children}
						<footer className='w-full flex items-center justify-center py-3'>
							<Link
								isExternal
								className='flex items-center gap-1 text-current'
								href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
								title='nextui.org homepage'
							>
								<span className='text-default-600'>
									Powered by
								</span>
								<p className='text-primary'>ZIT Software</p>
							</Link>
						</footer>
					</div>
				</Providers>

				<Toaster />
			</body>
		</html>
	);
}
