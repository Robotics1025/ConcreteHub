'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextValue {
    showToast: (type: ToastType, message: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev, { id, type, message }]);
    }, []);

    const success = useCallback((message: string) => showToast('success', message), [showToast]);
    const error = useCallback((message: string) => showToast('error', message), [showToast]);
    const warning = useCallback((message: string) => showToast('warning', message), [showToast]);
    const info = useCallback((message: string) => showToast('info', message), [showToast]);

    const handleClose = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getIconByType = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon />;
            case 'error':
                return <ErrorIcon />;
            case 'warning':
                return <WarningIcon />;
            case 'info':
                return <InfoIcon />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
            {children}
            {toasts.map((toast, index) => (
                <Snackbar
                    key={toast.id}
                    open={true}
                    autoHideDuration={5000}
                    onClose={() => handleClose(toast.id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={Slide}
                    sx={{
                        top: { xs: 70 + index * 70, md: 90 + index * 70 },
                    }}
                >
                    <Alert
                        onClose={() => handleClose(toast.id)}
                        severity={toast.type}
                        variant="filled"
                        icon={getIconByType(toast.type)}
                        sx={{
                            width: '100%',
                            minWidth: 300,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            boxShadow: 4,
                            '& .MuiAlert-icon': {
                                fontSize: 24,
                            },
                        }}
                    >
                        {toast.message}
                    </Alert>
                </Snackbar>
            ))}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
