"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const seedCustomers = [
  { id: 1, name: "Maria Costa", company: "Bay Concrete", email: "maria@bayco.com", phone: "+1 415-555-1245", status: "active" as const, orders: 14, spend: 18200 },
  { id: 2, name: "James Patel", company: "Metro Builders", email: "james@metrobuild.com", phone: "+1 206-555-8899", status: "active" as const, orders: 9, spend: 9200 },
  { id: 3, name: "Ling Chen", company: "Skyline Dev", email: "ling@skyline.dev", phone: "+1 917-555-4432", status: "inactive" as const, orders: 3, spend: 2400 },
  { id: 4, name: "Ravi Kumar", company: "North Shore", email: "ravi@northshore.io", phone: "+1 312-555-2222", status: "active" as const, orders: 6, spend: 6100 },
  { id: 5, name: "Sara Lopez", company: "Civic Works", email: "sara@civicworks.com", phone: "+1 303-555-7711", status: "active" as const, orders: 11, spend: 13400 },
];

type StatusFilter = "all" | "active" | "inactive";

type Customer = typeof seedCustomers[number];

export default function SupplierCustomersPage() {
  const [customers] = useState(seedCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase();
      const matches =
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q);
      const statusOk = statusFilter === "all" ? true : c.status === statusFilter;
      return matches && statusOk;
    });
  }, [customers, search, statusFilter]);

  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((c) => c.status === "active").length;
    const inactive = total - active;
    const spend = customers.reduce((sum, c) => sum + c.spend, 0);
    return { total, active, inactive, spend };
  }, [customers]);

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1.2} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <PersonRoundedIcon sx={{ color: "#FF6A00" }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>
              Customers
            </Typography>
            <Chip label="CRM" size="small" sx={{ fontWeight: 700, bgcolor: "#FFF3E6" }} />
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Track relationships, status, and spend to prioritize follow-up.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
          <SummaryCard label="Customers" value={stats.total.toString()} icon={<PersonRoundedIcon />} accent="#FF6A00" />
          <SummaryCard label="Active" value={stats.active.toString()} icon={<CircleRoundedIcon fontSize="small" />} accent="#16A34A" />
          <SummaryCard label="Inactive" value={stats.inactive.toString()} icon={<CircleRoundedIcon fontSize="small" />} accent="#94A3B8" />
          <SummaryCard label="Lifetime spend" value={`$${stats.spend.toLocaleString()}`} icon={<EmailRoundedIcon />} accent="#2563EB" />
        </Stack>

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
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
            sx={{ mb: 2 }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {["all", "active", "inactive"].map((f) => (
                <Chip
                  key={f}
                  label={f === "all" ? "All" : f === "active" ? "Active" : "Inactive"}
                  color={statusFilter === f ? "primary" : "default"}
                  onClick={() => setStatusFilter(f as StatusFilter)}
                  sx={{ fontWeight: 700 }}
                />
              ))}
            </Stack>
          </Stack>

          <Table
            size="small"
            sx={{
              "& tbody tr:hover": { backgroundColor: "rgba(255,106,0,0.05)" },
              "& thead th": { textTransform: "uppercase", fontSize: 12, letterSpacing: 0.6, color: "text.secondary" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Spend</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} hover sx={{ borderBottom: "1px solid rgba(145,158,171,0.08)" }}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#FFF3E6", color: "#FF6A00", fontWeight: 700 }}>
                        {c.name.slice(0, 1)}
                      </Avatar>
                      <Stack spacing={0.2}>
                        <Typography sx={{ fontWeight: 800 }}>{c.name}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <EmailRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {c.email}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PhoneRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {c.phone}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell>${c.spend.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={c.status === "active" ? "Active" : "Inactive"}
                      color={c.status === "active" ? "success" : "default"}
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}

function SummaryCard({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 2.5,
        borderRadius: 2.5,
        border: "1px solid rgba(145,158,171,0.12)",
        bgcolor: "linear-gradient(135deg, rgba(255,106,0,0.06), rgba(255,255,255,0.95))",
        boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: `${accent}1A`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
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
