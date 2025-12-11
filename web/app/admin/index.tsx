import Head from 'next/head';
import { Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WidgetSummary } from '@/components/widgets/WidgetSummary';
import { AppWebsiteVisits } from '@/components/charts/AppWebsiteVisits';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <Head>
                <title>Admin Dashboard | ConcreteHub</title>
            </Head>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Admin Overview
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Total Users"
                            total={3500}
                            icon={<PeopleIcon />}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Active Suppliers"
                            total={120}
                            icon={<StoreIcon />}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Total Transactions"
                            total={9850}
                            icon={<ReceiptIcon />}
                            color="warning"
                            percent={5.2}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Platform Revenue"
                            total={85000}
                            icon={<BarChartIcon />}
                            color="success"
                            percent={10.1}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <AppWebsiteVisits
                            title="Platform Growth"
                            subheader="(+12%) than last year"
                            chartLabels={[
                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ]}
                            chartData={[
                                {
                                    name: 'Users',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
                                },
                                {
                                    name: 'Orders',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                                },
                            ]}
                        />
                    </Grid>

                </Grid>
            </Container>
        </DashboardLayout>
    );
}
