import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
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
		{ media: '(prefers-color-scheme: dark)', color: 'white' },
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head />
			<body className={clsx('font-sans antialiased bg-blue-50', fontSans.className)}>
				<Providers
					themeProps={{
						attribute: 'class',
						defaultTheme: 'light',
						themes: ['light'],
					}}
				>
					<div className='relative flex flex-col min-h-screen'>
						<Navbar />
						{children}
					</div>
				</Providers>

				<Toaster />
			</body>
		</html>
	);
}
