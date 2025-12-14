'use client';

import { Box, Skeleton, Card, CardContent, Grid, Stack } from '@mui/material';

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <Card sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" height={220} />
            <CardContent>
                <Skeleton variant="text" sx={{ fontSize: '1.2rem', mb: 1 }} />
                <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Skeleton variant="rectangular" width={100} height={20} />
                    <Skeleton variant="text" width={50} />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width={80} height={30} />
                    <Skeleton variant="text" width={60} height={30} />
                </Stack>
                <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
            </CardContent>
        </Card>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <tr>
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} style={{ padding: '16px' }}>
                    <Skeleton variant="text" />
                </td>
            ))}
        </tr>
    );
}

// Page Content Skeleton
export function PageSkeleton() {
    return (
        <Box sx={{ p: 3 }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2, maxWidth: 400 }} />
            <Stack spacing={2} sx={{ mb: 4 }}>
                <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Box>
    );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
    return (
        <Card>
            <CardContent>
                <Stack spacing={1.5}>
                    <Skeleton variant="circular" width={48} height={48} />
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={100} />
                    <Skeleton variant="text" width={120} />
                </Stack>
            </CardContent>
        </Card>
    );
}

// Form Skeleton
export function FormSkeleton({ fields = 5 }: { fields?: number }) {
    return (
        <Stack spacing={3}>
            {Array.from({ length: fields }).map((_, i) => (
                <Box key={i}>
                    <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                </Box>
            ))}
            <Skeleton variant="rectangular" height={48} width={150} sx={{ borderRadius: 1 }} />
        </Stack>
    );
}
