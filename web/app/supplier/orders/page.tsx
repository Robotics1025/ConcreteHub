"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Card,
  CardContent,
  alpha,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import { orders, orderCounts, statusMeta, OrderStatus } from "./data";

const tabs: { key: OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "refunded", label: "Refunded" },
];

const columnSx = {
  fontWeight: 700,
  color: "#344054",
  fontSize: "0.95rem",
};

export default function SupplierOrdersListPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [menuAnchor, setMenuAnchor] = useState<{ id: string; el: HTMLElement } | null>(null);
  const router = useRouter();

  const inProgressCount = useMemo(
    () => orders.filter((o) => o.history.some((h) => h.status === "in-progress")).length,
    []
  );

  const summaryCards = useMemo(
    () => [
      {
        key: "all",
        label: "All Orders",
        value: orderCounts.all,
        icon: AllInboxRoundedIcon,
        color: "#111827",
        bg: "#F4F6FA",
      },
      {
        key: "pending",
        label: "Pending",
        value: orderCounts.pending,
        icon: PendingActionsRoundedIcon,
        color: statusMeta.pending.color,
        bg: statusMeta.pending.bg,
      },
      {
        key: "completed",
        label: "Completed",
        value: orderCounts.completed,
        icon: CheckCircleRoundedIcon,
        color: statusMeta.completed.color,
        bg: statusMeta.completed.bg,
      },
      {
        key: "in-progress",
        label: "In Progress",
        value: inProgressCount,
        icon: TimelapseRoundedIcon,
        color: "#0EA5E9",
        bg: alpha("#0EA5E9", 0.12),
      },
    ],
    [inProgressCount]
  );

  const filtered = useMemo(() => {
    const startTs = startDate ? new Date(startDate).getTime() : null;
    const endTs = endDate ? new Date(endDate).getTime() : null;

    const statusPool = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

    const dateFiltered = statusPool.filter((o) => {
      const orderTs = new Date(o.date).getTime();
      if (startTs !== null && orderTs < startTs) return false;
      if (endTs !== null && orderTs > endTs) return false;
      return true;
    });

    if (!search.trim()) return dateFiltered;
    const term = search.toLowerCase();
    return dateFiltered.filter((o) =>
      [o.id, o.customerName, o.customerEmail].some((field) => field.toLowerCase().includes(term))
    );
  }, [activeTab, search, startDate, endDate]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [filtered]
  );

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={card.key}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid rgba(145, 158, 171, 0.12)",
                    boxShadow: "0 18px 42px rgba(15,23,42,0.08)",
                    bgcolor: "white",
                    minHeight: 136,
                  }}
                >
                  <CardContent sx={{ py: 2.9, px: 3.1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2.25}>
                      <Box>
                        <Typography sx={{ fontWeight: 800, color: "#4A5568", letterSpacing: 0.1, fontSize: "1rem" }}>
                          {card.label}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: "#0F172A", mt: 0.8 }}>
                          {card.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 62,
                          height: 62,
                          borderRadius: "50%",
                          bgcolor: card.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon sx={{ color: card.color, fontSize: 28 }} />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid rgba(145, 158, 171, 0.16)",
            boxShadow:
              "0 20px 60px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Box sx={{ px: 3, pt: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              sx={{
                minHeight: 56,
                "& .MuiTab-root": { fontWeight: 700, textTransform: "none", fontSize: "1rem" },
                "& .Mui-selected": { color: "#101828" },
                "& .MuiTabs-indicator": { bgcolor: "#101828", height: 3, borderRadius: 99 },
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  value={tab.key}
                  label={`${tab.label} ${orderCounts[tab.key] ? orderCounts[tab.key] : 0}`}
                  iconPosition="end"
                />
              ))}
            </Tabs>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 3 }}>
              <TextField
                type="date"
                label="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="date"
                label="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Search customer or order number..."
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton sx={{ alignSelf: "center" }}>
                <MoreVertIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#101828" }}>
                {sorted.length} results found
              </Typography>
              {activeTab !== "all" && (
                <Chip
                  label={`Status: ${statusMeta[activeTab].label}`}
                  onDelete={() => setActiveTab("all")}
                  sx={{
                    fontWeight: 700,
                    bgcolor: alpha(statusMeta[activeTab].bg, 0.8),
                    color: statusMeta[activeTab].color,
                    borderRadius: 2,
                  }}
                />
              )}
              {(search || activeTab !== "all") && (
                <Button
                  onClick={() => {
                    setSearch("");
                    setActiveTab("all");
                    setStartDate("");
                    setEndDate("");
                  }}
                  color="error"
                  sx={{ textTransform: "none", fontWeight: 700 }}
                >
                  Clear
                </Button>
              )}
            </Stack>
          </Box>

          <Divider />

          <TableContainer>
            <Table sx={{ minWidth: 960 }}>
              <TableHead sx={{ bgcolor: "#F2F4F7" }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell sx={columnSx}>Order</TableCell>
                  <TableCell sx={columnSx}>Customer</TableCell>
                  <TableCell sx={columnSx}>Date</TableCell>
                  <TableCell sx={columnSx}>Items</TableCell>
                  <TableCell sx={columnSx}>Price</TableCell>
                  <TableCell sx={columnSx}>Status</TableCell>
                  <TableCell sx={columnSx} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <Link href={`/supplier/orders/${order.id}`} style={{ color: "#101828", textDecoration: "underline" }}>
                        #{order.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={order.customerAvatar} alt={order.customerName} />
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>{order.customerName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.customerEmail}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>
                        {new Date(order.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.time}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{order.items}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusMeta[order.status].label}
                        sx={{
                          bgcolor: statusMeta[order.status].bg,
                          color: statusMeta[order.status].color,
                          fontWeight: 700,
                          borderRadius: 999,
                          px: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => setMenuAnchor({ id: order.id, el: e.currentTarget })}
                        aria-label={`Actions for order ${order.id}`}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchor?.el}
                        open={menuAnchor?.id === order.id}
                        onClose={() => setMenuAnchor(null)}
                      >
                        <MenuItem
                          onClick={() => {
                            router.push(`/supplier/orders/${order.id}`);
                            setMenuAnchor(null);
                          }}
                        >
                          View details
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ color: "#344054", fontWeight: 600 }}>
                Rows per page:
              </Typography>
              <Chip label="5" sx={{ borderRadius: 1, fontWeight: 700 }} />
              <Typography variant="body2" sx={{ color: "#667085" }}>
                1–{Math.min(5, sorted.length)} of {sorted.length}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton disabled>
                <ArrowForwardIosIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} />
              </IconButton>
              <IconButton>
                <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
