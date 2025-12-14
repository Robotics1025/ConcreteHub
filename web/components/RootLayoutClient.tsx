'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Header from './Header';
import Footer from './Footer';
import CustomerSupportBot from './CustomerSupportBot';
import { ToastProvider } from './Toast/ToastProvider';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if we're on a supplier or admin page
  const isSupplierPage = pathname.startsWith('/supplier');
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <SessionProvider>
      <ToastProvider>
        {/* Don't show Header, Footer, or CustomerSupportBot for supplier/admin pages */}
        {isSupplierPage || isAdminPage ? (
          <>{children}</>
        ) : (
          <>
            <Header />
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
            <CustomerSupportBot />
          </>
        )}
      </ToastProvider>
    </SessionProvider>
  );
}
