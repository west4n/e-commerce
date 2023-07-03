import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ruRU } from '@clerk/localizations'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard Panel',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider localization={ruRU}>
			<html lang='ru'>
				<body className={inter.className}>
					<ToasterProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
