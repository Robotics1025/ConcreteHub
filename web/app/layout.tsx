import './global.css';
import ThemeRegistry from '../components/ThemeRegistry';
import { ReactNode } from 'react';
import RootLayoutClient from '../components/RootLayoutClient';

type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <ThemeRegistry>
                    <RootLayoutClient>{children}</RootLayoutClient>
                </ThemeRegistry>
            </body>
        </html>
    );
}
