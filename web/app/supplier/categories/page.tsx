"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

const initialCategories = [
  {
    id: 1,
    name: "Cement & Binder",
    description: "OPC, PPC, and specialty binders for structural work.",
    products: 24,
    status: "active" as const,
    updated: "2025-01-12",
  },
  {
    id: 2,
    name: "Steel & Rebar",
    description: "TMT bars, mesh, and structural steel profiles.",
    products: 18,
    status: "active" as const,
    updated: "2024-12-04",
  },
  {
    id: 3,
    name: "Aggregates",
    description: "Sand, gravel, crushed stone, and base materials.",
    products: 15,
    status: "inactive" as const,
    updated: "2024-10-21",
  },
  {
    id: 4,
    name: "Additives",
    description: "Plasticizers, retarders, waterproofing, and admixtures.",
    products: 11,
    status: "active" as const,
    updated: "2025-01-03",
  },
];

type CategoryStatus = "active" | "inactive";

type CategoryDraft = {
  name: string;
  description: string;
  status: CategoryStatus;
};

const emptyDraft: CategoryDraft = {
  name: "",
  description: "",
  status: "active",
};

export default function SupplierCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CategoryStatus>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<CategoryDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nameError, setNameError] = useState(false);

  const filtered = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" ? true : cat.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const summary = useMemo(() => {
    const total = categories.length;
    const active = categories.filter((c) => c.status === "active").length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [categories]);

  const openAddDialog = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setNameError(false);
    setDialogOpen(true);
  };

  const openEditDialog = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    setDraft({ name: cat.name, description: cat.description, status: cat.status });
    setEditingId(id);
    setNameError(false);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!draft.name.trim()) {
      setNameError(true);
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...draft, updated: now } : c)),
      );
    } else {
      const nextId = Math.max(0, ...categories.map((c) => c.id)) + 1;
      setCategories((prev) => [...prev, { id: nextId, products: 0, updated: now, ...draft }]);
    }

    setDialogOpen(false);
  };

  const handleStatusChipToggle = (id: number) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active", updated: new Date().toISOString().slice(0, 10) }
          : c,
      ),
    );
  };

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <CategoryRoundedIcon sx={{ color: "#FF6A00" }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>
              Categories
            </Typography>
            <Chip label="Live" size="small" color="success" sx={{ fontWeight: 700, ml: 0.5 }} />
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Organize products into clear buckets. Active categories surface across listings.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 2.5,
              border: "1px solid rgba(145,158,171,0.14)",
              bgcolor: "linear-gradient(135deg, rgba(255,106,0,0.08), rgba(255,255,255,0.9))",
              boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Total
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Inventory2RoundedIcon sx={{ color: "#FF6A00" }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{summary.total}</Typography>
            </Stack>
          </Paper>
          <Paper
            elevation={0}
            sx={{ flex: 1, p: 2.5, borderRadius: 2.5, border: "1px solid rgba(145,158,171,0.14)", bgcolor: "white" }}
          >
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Active
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip size="small" label="Active" color="success" />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{summary.active}</Typography>
            </Stack>
          </Paper>
          <Paper
            elevation={0}
            sx={{ flex: 1, p: 2.5, borderRadius: 2.5, border: "1px solid rgba(145,158,171,0.14)", bgcolor: "white" }}
          >
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Inactive
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip size="small" label="Inactive" color="default" />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{summary.inactive}</Typography>
            </Stack>
          </Paper>
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
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 2 }}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | CategoryStatus)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <Button
              startIcon={<AddRoundedIcon />}
              variant="contained"
              onClick={openAddDialog}
              sx={{ fontWeight: 800, minWidth: 160, boxShadow: "0 10px 25px rgba(255,106,0,0.28)" }}
            >
              Add category
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Table size="small" sx={{ "& tbody tr:hover": { backgroundColor: "rgba(255,106,0,0.05)" } }}>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((cat) => (
                <TableRow key={cat.id} hover>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography sx={{ fontWeight: 800 }}>{cat.name}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {cat.description}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{cat.products}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={cat.status === "active" ? "Active" : "Inactive"}
                      color={cat.status === "active" ? "success" : "default"}
                      onClick={() => handleStatusChipToggle(cat.id)}
                      sx={{ fontWeight: 700, cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>{cat.updated}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => openEditDialog(cat.id)}>
                      <EditRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          {editingId ? "Edit category" : "Add category"}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={draft.name}
              onChange={(e) => {
                setDraft((prev) => ({ ...prev, name: e.target.value }));
                setNameError(false);
              }}
              required
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
              fullWidth
            />
            <TextField
              label="Description"
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              multiline
              minRows={2}
              fullWidth
            />
            <TextField
              select
              label="Status"
              value={draft.status}
              onChange={(e) => setDraft((prev) => ({ ...prev, status: e.target.value as CategoryStatus }))}
              fullWidth
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} sx={{ fontWeight: 800 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
