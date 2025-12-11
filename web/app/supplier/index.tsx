import Head from 'next/head';
import { Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WidgetSummary } from '@/components/widgets/WidgetSummary';
import { AppWebsiteVisits } from '@/components/charts/AppWebsiteVisits';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function SupplierDashboard() {
    return (
        <DashboardLayout>
            <Head>
                <title>Supplier Dashboard | ConcreteHub</title>
            </Head>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back 👋
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Total Sales"
                            total={18500}
                            icon={<AttachMoneyIcon />}
                            color="primary"
                            percent={2.6}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="New Orders"
                            total={25}
                            icon={<ShoppingBagIcon />}
                            color="info"
                            percent={-0.4}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Products Listed"
                            total={142}
                            icon={<InventoryIcon />}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetSummary
                            title="Revenue Growth"
                            total={4821}
                            icon={<TrendingUpIcon />}
                            color="success"
                            percent={12.5}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits
                            title="Sales Overview"
                            subheader="(+43%) than last year"
                            chartLabels={[
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ]}
                            chartData={[
                                {
                                    name: 'Sales',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                    name: 'Revenue',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        {/* Can add another chart or list here */}
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
}
