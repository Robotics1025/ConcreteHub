'use client';

import { usePathname } from 'next/navigation';
import SupplierDashboardLayout from './SupplierDashboardLayout';

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show sidebar layout for signin/signup pages
  const isAuthPage = pathname === '/supplier/signin' || pathname === '/supplier/signup';
  
  if (isAuthPage) {
    return <>{children}</>;
  }
  
  return <SupplierDashboardLayout>{children}</SupplierDashboardLayout>;
}
