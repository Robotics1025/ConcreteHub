'use client';

import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
    loading?: boolean;
}

export default function LoadingButton({ loading, children, disabled, ...props }: LoadingButtonProps) {
    return (
        <Button
            {...props}
            disabled={disabled || loading}
            sx={{
                position: 'relative',
                ...props.sx,
            }}
        >
            {loading && (
                <CircularProgress
                    size={20}
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-10px',
                    }}
                />
            )}
            <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
                {children}
            </span>
        </Button>
    );
}
