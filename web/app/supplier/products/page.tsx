"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

// Mock supplier product data
const PRODUCTS_SEED = [
  {
    id: "PRD-001",
    name: "Premium Interlocking Pavers",
    category: "Pavers",
    price: 3500,
    stock: 450,
    lowStockThreshold: 50,
    status: "active",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=160&h=160&fit=crop&auto=format",
    description: "High-quality interlocking pavers ideal for driveways and walkways.",
    dimensions: "200mm x 100mm x 60mm",
    piecesPerBundle: 50,
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=640&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=640&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=640&h=480&fit=crop&auto=format",
    ],
  },
  {
    id: "PRD-002",
    name: "Concrete Blocks",
    category: "Blocks",
    price: 2800,
    stock: 28,
    lowStockThreshold: 50,
    status: "active",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=160&h=160&fit=crop&auto=format",
    description: "Solid concrete blocks suitable for structural walls and foundations.",
    dimensions: "390mm x 190mm x 190mm",
    piecesPerBundle: 60,
    images: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=640&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=640&h=480&fit=crop&auto=format",
    ],
  },
  {
    id: "PRD-003",
    name: "Road Curbs",
    category: "Curbs",
    price: 4200,
    stock: 8,
    lowStockThreshold: 30,
    status: "active",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=160&h=160&fit=crop&auto=format",
    description: "Precast concrete curbs for road edges and parking lots.",
    dimensions: "1000mm x 150mm x 300mm",
    piecesPerBundle: 20,
    images: [
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=640&h=480&fit=crop&auto=format",
    ],
  },
  {
    id: "PRD-004",
    name: "Paving Stones",
    category: "Pavers",
    price: 4100,
    stock: 0,
    lowStockThreshold: 40,
    status: "inactive",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=160&h=160&fit=crop&auto=format",
    description: "Decorative paving stones for patios and garden paths.",
    dimensions: "250mm x 250mm x 50mm",
    piecesPerBundle: 30,
    images: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=640&h=480&fit=crop&auto=format",
    ],
  },
  {
    id: "PRD-005",
    name: "Drainage Culverts",
    category: "Drainage",
    price: 7800,
    stock: 120,
    lowStockThreshold: 25,
    status: "active",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=160&h=160&fit=crop&auto=format",
    description: "Reinforced concrete culverts for stormwater management.",
    dimensions: "1200mm x 600mm",
    piecesPerBundle: 4,
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=640&h=480&fit=crop&auto=format",
    ],
  },
];

type ProductStatus = "active" | "inactive";

type Product = typeof PRODUCTS_SEED[number];

type SummaryCard = {
  key: string;
  label: string;
  value: number;
  icon: typeof Inventory2RoundedIcon;
  color: string;
  bg: string;
};

export default function SupplierProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_SEED);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const summaryCards: SummaryCard[] = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "active").length;
    const lowStock = products.filter((p) => p.status === "active" && p.stock > 0 && p.stock <= p.lowStockThreshold).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;

    return [
      {
        key: "all",
        label: "All Products",
        value: total,
        icon: LocalMallRoundedIcon,
        color: "#111827",
        bg: "#EEF2FF",
      },
      {
        key: "active",
        label: "Active",
        value: active,
        icon: CheckCircleRoundedIcon,
        color: "#0F9B4C",
        bg: alpha("#0F9B4C", 0.12),
      },
      {
        key: "low",
        label: "Low Stock",
        value: lowStock,
        icon: WarningAmberRoundedIcon,
        color: "#B54708",
        bg: alpha("#B54708", 0.12),
      },
      {
        key: "out",
        label: "Out of Stock",
        value: outOfStock,
        icon: CancelRoundedIcon,
        color: "#B42318",
        bg: alpha("#B42318", 0.12),
      },
    ];
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (category !== "all" && p.category !== category) return false;
      if (search.trim()) {
        const term = search.toLowerCase();
        if (!p.name.toLowerCase().includes(term) && !p.id.toLowerCase().includes(term)) return false;
      }
      return true;
    });
  }, [products, search, category, statusFilter]);

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
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }}>
              <TextField
                placeholder="Search products or ID..."
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
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                fullWidth
                size="small"
                sx={{ fontWeight: 700 }}
                renderValue={(val) => (val === "all" ? "All categories" : val)}
              >
                <MenuItem value="all">All categories</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ProductStatus | "all")}
                displayEmpty
                fullWidth
                size="small"
                sx={{ fontWeight: 700 }}
                renderValue={(val) => (val === "all" ? "All status" : val === "active" ? "Active" : "Inactive")}
              >
                <MenuItem value="all">All status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ alignSelf: { xs: "flex-start", md: "center" } }}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, val) => val && setViewMode(val)}
                  size="small"
                  sx={{ bgcolor: "rgba(145,158,171,0.08)", borderRadius: 2 }}
                >
                  <ToggleButton value="table" sx={{ px: 1.5 }} aria-label="Table view">
                    <ViewListRoundedIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="grid" sx={{ px: 1.5 }} aria-label="Grid view">
                    <ViewModuleRoundedIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#101828" }}>
                {filtered.length} products found
              </Typography>
              {(search || category !== "all" || statusFilter !== "all") && (
                <Button
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setStatusFilter("all");
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

          {viewMode === "table" ? (
            <TableContainer>
              <Table sx={{ minWidth: 960 }}>
                <TableHead sx={{ bgcolor: "#F2F4F7" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#344054" }} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((product) => {
                    const isLow = product.stock > 0 && product.stock <= product.lowStockThreshold;
                    const isOut = product.stock === 0;

                    return (
                      <TableRow key={product.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar src={product.image} alt={product.name} />
                            <Box>
                              <Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{product.category}</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>${product.price.toLocaleString()}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: isOut ? "#B42318" : isLow ? "#B54708" : "#0F9B4C" }}>
                          {product.stock === 0 ? "Out" : product.stock}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status === "active" ? "Active" : "Inactive"}
                            sx={{
                              bgcolor: product.status === "active" ? alpha("#0F9B4C", 0.12) : alpha("#B42318", 0.12),
                              color: product.status === "active" ? "#0F9B4C" : "#B42318",
                              fontWeight: 700,
                              borderRadius: 999,
                              px: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            onClick={() => setSelectedProduct(product)}
                            sx={{ fontWeight: 700, textTransform: "none" }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ px: 3, py: 3 }}>
              <Grid container spacing={2.5}>
                {filtered.map((product) => {
                  const isLow = product.stock > 0 && product.stock <= product.lowStockThreshold;
                  const isOut = product.stock === 0;
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          border: "1px solid rgba(145, 158, 171, 0.16)",
                          boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
                          height: "100%",
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Stack spacing={1.5} sx={{ mb: 2 }}>
                            <Box
                              component="img"
                              src={product.image}
                              alt={product.name}
                              sx={{
                                width: "100%",
                                height: 160,
                                objectFit: "cover",
                                borderRadius: 2,
                                border: "1px solid rgba(145, 158, 171, 0.12)",
                                bgcolor: "#F8FAFC",
                              }}
                            />
                            <Box sx={{ minWidth: 0 }}>
                              <Typography sx={{ fontWeight: 800, color: "#0F172A" }} noWrap>
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {product.id}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack spacing={1.25}>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="body2" color="text.secondary">Category</Typography>
                              <Typography sx={{ fontWeight: 700 }}>{product.category}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="body2" color="text.secondary">Price</Typography>
                              <Typography sx={{ fontWeight: 800, color: "#111827" }}>${product.price.toLocaleString()}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="body2" color="text.secondary">Stock</Typography>
                              <Typography sx={{ fontWeight: 700, color: isOut ? "#B42318" : isLow ? "#B54708" : "#0F9B4C" }}>
                                {product.stock === 0 ? "Out" : product.stock}
                              </Typography>
                            </Stack>
                            <Chip
                              label={product.status === "active" ? "Active" : "Inactive"}
                              sx={{
                                bgcolor: product.status === "active" ? alpha("#0F9B4C", 0.12) : alpha("#B42318", 0.12),
                                color: product.status === "active" ? "#0F9B4C" : "#B42318",
                                fontWeight: 700,
                                borderRadius: 2,
                                width: "fit-content",
                              }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 0.5 }}>
                              <Button
                                variant="text"
                                onClick={() => setSelectedProduct(product)}
                                sx={{ fontWeight: 700, textTransform: "none", p: 0, minWidth: 0 }}
                              >
                                View
                              </Button>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>

      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>{selectedProduct.name}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Box
                  component="img"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  sx={{ width: "100%", borderRadius: 2, objectFit: "cover", border: "1px solid rgba(145, 158, 171, 0.12)" }}
                />
                <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {selectedProduct.description}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Product ID</Typography>
                  <Typography fontWeight={700}>{selectedProduct.id}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Category</Typography>
                  <Typography fontWeight={700}>{selectedProduct.category}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Dimensions</Typography>
                  <Typography fontWeight={700}>{selectedProduct.dimensions}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Pieces / bundle</Typography>
                  <Typography fontWeight={700}>{selectedProduct.piecesPerBundle}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Price</Typography>
                  <Typography fontWeight={800}>${selectedProduct.price.toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Stock</Typography>
                  <Typography fontWeight={700}>{selectedProduct.stock === 0 ? "Out of stock" : selectedProduct.stock}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Status</Typography>
                  <Chip
                    label={selectedProduct.status === "active" ? "Active" : "Inactive"}
                    sx={{
                      bgcolor: selectedProduct.status === "active" ? alpha("#0F9B4C", 0.12) : alpha("#B42318", 0.12),
                      color: selectedProduct.status === "active" ? "#0F9B4C" : "#B42318",
                      fontWeight: 700,
                      borderRadius: 999,
                      px: 1,
                    }}
                  />
                </Stack>
                  {selectedProduct.images?.length ? (
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 1 }}>Related images</Typography>
                      <Grid container spacing={1.5}>
                        {selectedProduct.images.map((img, idx) => (
                          <Grid item xs={6} sm={4} key={idx}>
                            <Box
                              component="img"
                              src={img}
                              alt={`${selectedProduct.name} ${idx + 1}`}
                              sx={{
                                width: "100%",
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 1.5,
                                border: "1px solid rgba(145, 158, 171, 0.12)",
                                bgcolor: "#F8FAFC",
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : null}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedProduct(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
