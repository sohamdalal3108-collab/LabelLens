import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { DemoModeProvider } from '@/lib/context/DemoModeContext';
import { InspectionProvider } from '@/lib/context/InspectionContext';
import { DemoModeBanner } from '@/components/shared/DemoModeBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'LabelLens AI — Legal Metrology Inspection System',
  description:
    'AI-assisted compliance inspection system for Packaged Commodities under Legal Metrology Rules, 2011 (SIH26034).'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F7F5F0] text-neutral-900 min-h-screen flex flex-col antialiased selection:bg-orange-500 selection:text-white">
        <AuthProvider>
          <DemoModeProvider>
            <InspectionProvider>
              <DemoModeBanner />
              {children}
            </InspectionProvider>
          </DemoModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

