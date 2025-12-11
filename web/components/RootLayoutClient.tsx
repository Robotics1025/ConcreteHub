'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CustomerSupportBot from './CustomerSupportBot';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if we're on a supplier or admin page
  const isSupplierPage = pathname.startsWith('/supplier');
  const isAdminPage = pathname.startsWith('/admin');
  
  // Don't show Header, Footer, or CustomerSupportBot for supplier/admin pages
  if (isSupplierPage || isAdminPage) {
    return <>{children}</>;
  }
  
  // Show Header, Footer, and CustomerSupportBot for customer pages
  return (
    <>
      <Header />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
      <CustomerSupportBot />
    </>
  );
}
