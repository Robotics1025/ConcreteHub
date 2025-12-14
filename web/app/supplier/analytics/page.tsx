"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const series = [12, 18, 22, 19, 28, 31, 29, 34, 40, 38, 42, 47];
const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SupplierAnalyticsPage() {
  const [range, setRange] = useState("last-12m");

  const totals = useMemo(() => ({
    revenue: 482100,
    orders: 1240,
    products: 142,
    growth: 12.5,
  }), []);

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1.2} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <TrendingUpRoundedIcon sx={{ color: "#FF6A00" }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>
              Analytics
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Quick health metrics for revenue, orders, and inventory performance.
          </Typography>
        </Stack>

        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<AttachMoneyRoundedIcon />} label="Revenue" value={`$${totals.revenue.toLocaleString()}`} tone="#16A34A" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<ShoppingBagRoundedIcon />} label="Orders" value={totals.orders.toString()} tone="#2563EB" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<Inventory2RoundedIcon />} label="Products" value={totals.products.toString()} tone="#F97316" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<TrendingUpRoundedIcon />} label="Growth" value={`${totals.growth}%`} tone="#10B981" />
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid rgba(145, 158, 171, 0.16)",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.05)",
            p: { xs: 2, md: 3 },
            bgcolor: "white",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Sales trend
            </Typography>
            <TextField
              select
              label="Range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{ startAdornment: <CalendarMonthRoundedIcon sx={{ mr: 1, color: "text.disabled" }} /> }}
            >
              <MenuItem value="last-12m">Last 12 months</MenuItem>
              <MenuItem value="last-6m">Last 6 months</MenuItem>
              <MenuItem value="ytd">Year to date</MenuItem>
            </TextField>
          </Stack>

          <SimpleAreaChart data={series} categories={categories} />
        </Paper>
      </Container>
    </Box>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: 2,
        border: "1px solid rgba(145,158,171,0.14)",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: `${tone}1A`,
            color: tone,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
    </Paper>
  );
}

function SimpleAreaChart({ data, categories }: { data: number[]; categories: string[] }) {
  const max = Math.max(...data);
  return (
    <Box sx={{ width: "100%", height: 240, position: "relative", pt: 1 }}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" width="100%" height="100%">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#areaFill)"
          stroke="#FF6A00"
          strokeWidth="0.8"
          points={data
            .map((v, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 40 - (v / max) * 32 - 4;
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </svg>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        {categories.map((c) => (
          <Typography key={c} variant="caption" sx={{ color: "text.disabled" }}>
            {c}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
