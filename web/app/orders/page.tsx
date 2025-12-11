'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stack,
  Chip,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  alpha,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import NewsletterPopup from '@/components/NewsletterPopup';

const ORDERS = [
  {
    id: 'ORD-2025-001',
    date: '2025-12-08',
    status: 'delivered',
    total: 45000,
    items: 3,
    products: [
      { name: 'Interlocking Pavers', quantity: 100, price: 3500, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=100&h=100&fit=crop' },
      { name: 'S Pavers', quantity: 50, price: 4500, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ORD-2025-002',
    date: '2025-12-09',
    status: 'shipping',
    total: 28500,
    items: 2,
    products: [
      { name: 'Concrete Blocks', quantity: 200, price: 2800, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=100&h=100&fit=crop' },
      { name: 'Road Curbs', quantity: 30, price: 4200, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=100&h=100&fit=crop' },
      ],
  },
  {
    id: 'ORD-2025-003',
    date: '2025-12-10',
    status: 'processing',
    total: 67500,
    items: 4,
    products: [
      { name: 'Drainage Culverts', quantity: 20, price: 7800, image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=100&h=100&fit=crop' },
      { name: 'Medium Slabs', quantity: 50, price: 3800, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ORD-2025-004',
    date: '2025-12-05',
    status: 'cancelled',
    total: 12500,
    items: 1,
    products: [
      { name: 'Paving Stones', quantity: 50, price: 4100, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=100&h=100&fit=crop' },
    ],
  },
];

const STATUS_CONFIG = {
  delivered: { label: 'Delivered', color: 'success', icon: CheckCircleIcon },
  shipping: { label: 'Shipping', color: 'info', icon: LocalShippingIcon },
  processing: { label: 'Processing', color: 'warning', icon: HourglassEmptyIcon },
  cancelled: { label: 'Cancelled', color: 'error', icon: CancelIcon },
};

export default function OrdersPage() {
  const [tabValue, setTabValue] = useState(0);

  const statusCounts = useMemo(() => {
    return ORDERS.reduce(
      (acc, order) => {
        acc.all += 1;
        acc[order.status as keyof typeof acc] += 1;
        return acc;
      },
      { all: 0, processing: 0, shipping: 0, delivered: 0, cancelled: 0 }
    );
  }, []);

  const summaryCards = useMemo(
    () => [
      {
        key: 'all',
        label: 'All Orders',
        value: statusCounts.all,
        icon: AllInboxRoundedIcon,
        color: '#4F46E5',
        bg: alpha('#4F46E5', 0.12),
      },
      {
        key: 'processing',
        label: 'Processing',
        value: statusCounts.processing,
        icon: HourglassEmptyIcon,
        color: '#F59E0B',
        bg: alpha('#F59E0B', 0.14),
      },
      {
        key: 'shipping',
        label: 'Shipping',
        value: statusCounts.shipping,
        icon: LocalShippingRoundedIcon,
        color: '#0EA5E9',
        bg: alpha('#0EA5E9', 0.14),
      },
      {
        key: 'delivered',
        label: 'Delivered',
        value: statusCounts.delivered,
        icon: CheckCircleRoundedIcon,
        color: '#10B981',
        bg: alpha('#10B981', 0.14),
      },
      {
        key: 'cancelled',
        label: 'Cancelled',
        value: statusCounts.cancelled,
        icon: CancelPresentationRoundedIcon,
        color: '#EF4444',
        bg: alpha('#EF4444', 0.12),
      },
    ],
    [statusCounts]
  );

  const filterOrders = (status: string) => {
    if (status === 'all') return ORDERS;
    return ORDERS.filter(order => order.status === status);
  };

  const currentOrders = tabValue === 0 ? ORDERS : 
                       tabValue === 1 ? filterOrders('processing') :
                       tabValue === 2 ? filterOrders('shipping') :
                       tabValue === 3 ? filterOrders('delivered') :
                       filterOrders('cancelled');

  return (
    <Box sx={{ bgcolor: '#F4F6F8', minHeight: '100vh', pb: 8 }}>
      {/* Newsletter Popup for customer pages */}
      <NewsletterPopup delay={5000} customerType="customer" />
      
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* Page Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <ShoppingBagIcon sx={{ fontSize: 40, color: '#FF6A00' }} />
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              My Orders
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and track all your orders
            </Typography>
          </Box>
        </Stack>

        {/* Summary Cards */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Grid item xs={12} sm={6} md={12 / summaryCards.length} key={card.key}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(145, 158, 171, 0.14)',
                    boxShadow: '0 12px 36px rgba(15,23,42,0.06)',
                    bgcolor: 'white',
                  }}
                >
                  <CardContent sx={{ py: 2.75, px: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: '#667085', letterSpacing: 0.1, fontSize: '0.95rem' }}>
                          {card.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.75 }}>
                          {card.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          bgcolor: card.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ color: card.color, fontSize: 26 }} />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Paper sx={{ bgcolor: 'white', borderRadius: 2 }}>
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 3,
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 120,
              },
              '& .Mui-selected': {
                color: '#FF6A00',
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#FF6A00',
                height: 3,
              },
            }}
          >
            <Tab label={`All (${ORDERS.length})`} />
            <Tab label={`Processing (${filterOrders('processing').length})`} />
            <Tab label={`Shipping (${filterOrders('shipping').length})`} />
            <Tab label={`Delivered (${filterOrders('delivered').length})`} />
            <Tab label={`Cancelled (${filterOrders('cancelled').length})`} />
          </Tabs>

          {/* Orders List */}
          <Box sx={{ p: 3 }}>
            {currentOrders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingBagIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No orders found
                </Typography>
              </Box>
            ) : (
              <Stack spacing={3}>
                {currentOrders.map((order) => {
                  const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG].icon;
                  return (
                    <Card key={order.id} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
                      <CardContent sx={{ p: 3 }}>
                        {/* Order Header */}
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
                          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Order ID
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {order.id}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Date
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {new Date(order.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Total
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FF6A00' }}>
                                Shs {order.total.toLocaleString()}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Chip
                              icon={<StatusIcon />}
                              label={STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG].label}
                              color={STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG].color as any}
                              sx={{ fontWeight: 700 }}
                            />
                            <Button
                              variant="outlined"
                              startIcon={<VisibilityIcon />}
                              sx={{
                                borderColor: '#FF6A00',
                                color: '#FF6A00',
                                fontWeight: 600,
                                '&:hover': {
                                  borderColor: '#E65F00',
                                  bgcolor: 'rgba(255, 106, 0, 0.05)',
                                },
                              }}
                            >
                              View Details
                            </Button>
                          </Stack>
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        {/* Products */}
                        <Stack spacing={2}>
                          {order.products.map((product, idx) => (
                            <Stack key={idx} direction="row" spacing={2} alignItems="center">
                              <Avatar
                                variant="rounded"
                                src={product.image}
                                sx={{ width: 60, height: 60 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Quantity: {product.quantity} • Shs {product.price.toLocaleString()} per unit
                                </Typography>
                              </Box>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FF6A00' }}>
                                Shs {(product.quantity * product.price).toLocaleString()}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
