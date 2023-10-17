'use client';

import AuthProvider from '@/providers/AuthProvider';
import store from '@/store';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<Provider store={store}>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<NextUIProvider>
						<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
					</NextUIProvider>
				</QueryClientProvider>
			</AuthProvider>
		</Provider>
	);
}
