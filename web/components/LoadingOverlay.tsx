'use client';

import { Box, CircularProgress, Backdrop } from '@mui/material';

interface LoadingOverlayProps {
    open: boolean;
    message?: string;
}

export default function LoadingOverlay({ open, message }: LoadingOverlayProps) {
    return (
        <Backdrop
            open={open}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.modal + 1,
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <CircularProgress color="inherit" size={60} thickness={4} />
            {message && (
                <Box sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {message}
                </Box>
            )}
        </Backdrop>
    );
}
