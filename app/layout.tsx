import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import MyNavigationMenu from '@/components/myNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LostFin - Lost and Found Items',
  description: 'Connect lost items with their rightful owners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MyNavigationMenu />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}