"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Link from "next/link";

const initialState = {
  id: "",
  name: "",
  subtitle: "",
  category: "",
  price: "",
  stock: "",
  lowStockThreshold: "",
  dimensions: "",
  piecesPerBundle: "",
  status: "active",
  description: "",
  tags: [] as string[],
};

type FormState = typeof initialState;

type Status = "active" | "inactive";

const categories = [
  "Cement",
  "Steel",
  "Aggregates",
  "Additives",
  "Blocks & bricks",
  "Equipment",
  "Finishes",
];

export default function SupplierProductAddPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [tagInput, setTagInput] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setForm((prev) => ({ ...prev, status: e.target.value as Status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category.trim()) {
      setCategoryError(true);
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialState);
    setSubmitted(false);
    setImagePreview(null);
    setImageFileName("");
    setTagInput("");
    setCategoryError(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, value] }));
    setTagInput("");
  };

  const handleRemoveTag = (value: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== value) }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
    setCategoryError(false);
  };

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Link href="/supplier/products" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Button startIcon={<ArrowBackIosNewRoundedIcon />} sx={{ textTransform: "none", fontWeight: 700 }}>
                Back to products
              </Button>
            </Link>
            <Chip label="Draft" color="default" size="small" sx={{ fontWeight: 700, bgcolor: "#EEF2F6" }} />
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.3 }}>
            New product
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Mirror the MinimAl look: clean, airy layout with a bold image call-to-action and concise fields.
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: 3,
            border: "1px solid rgba(145, 158, 171, 0.16)",
            boxShadow: "0 25px 80px rgba(15, 23, 42, 0.06)",
            p: { xs: 3, md: 4 },
            background: "linear-gradient(180deg, #FFFFFF 0%, #F9FBFF 100%)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.08), transparent 25%), radial-gradient(circle at 80% 0%, rgba(99, 102, 241, 0.08), transparent 22%)",
            }}
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Stack spacing={2.5}>
                  <Stack spacing={0.5}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Product details
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Keep names concise; describe what makes it unique.
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    <TextField label="Product name" value={form.name} onChange={handleChange("name")} required fullWidth />
                    <TextField label="Subtitle / one-liner" value={form.subtitle} onChange={handleChange("subtitle")} fullWidth />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField label="Product ID / SKU" value={form.id} onChange={handleChange("id")} required fullWidth />
                    <FormControl fullWidth required error={categoryError}>
                      <InputLabel>Category</InputLabel>
                      <Select label="Category" value={form.category} onChange={handleCategoryChange}>
                        <MenuItem value="">
                          <em>Select category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                      {categoryError && <FormHelperText>Please select a category</FormHelperText>}
                    </FormControl>
                  </Stack>
                  <TextField
                    label="Description"
                    value={form.description}
                    onChange={handleChange("description")}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Tags
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }}>
                      <TextField
                        label="Add tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        fullWidth
                      />
                      <Button variant="outlined" onClick={handleAddTag} sx={{ fontWeight: 700 }}>
                        Add
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {form.tags.map((tag) => (
                        <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} sx={{ borderRadius: 1.5 }} />
                      ))}
                    </Stack>
                  </Stack>
                  <TextField label="Dimensions" value={form.dimensions} onChange={handleChange("dimensions")} fullWidth />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Pieces per bundle"
                      value={form.piecesPerBundle}
                      onChange={handleChange("piecesPerBundle")}
                      type="number"
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select label="Status" value={form.status} onChange={handleStatusChange}>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: "1px dashed rgba(99, 102, 241, 0.35)",
                      bgcolor: "rgba(99, 102, 241, 0.04)",
                    }}
                  >
                    <Stack spacing={1.5} alignItems="flex-start">
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        Cover image
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Drop in a clean cover. Square or 4:5 works well; keep it under 2MB.
                      </Typography>

                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center">
                        <input
                          id="product-image-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileSelect}
                        />
                        <input
                          id="product-image-camera"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          style={{ display: "none" }}
                          onChange={handleFileSelect}
                        />
                        <label htmlFor="product-image-upload">
                          <Button
                            component="span"
                            variant="contained"
                            startIcon={<CloudUploadRoundedIcon />}
                            sx={{ textTransform: "none", fontWeight: 800 }}
                          >
                            Upload
                          </Button>
                        </label>
                        <label htmlFor="product-image-camera">
                          <Button
                            component="span"
                            variant="outlined"
                            startIcon={<PhotoCameraRoundedIcon />}
                            sx={{ textTransform: "none", fontWeight: 800 }}
                          >
                            Take photo
                          </Button>
                        </label>
                        {imageFileName && (
                          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                            {imageFileName}
                          </Typography>
                        )}
                      </Stack>

                      {imagePreview && (
                        <Box
                          component="img"
                          src={imagePreview}
                          alt="Uploaded preview"
                          sx={{
                            width: "100%",
                            maxHeight: 320,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "1px solid rgba(99, 102, 241, 0.35)",
                          }}
                        />
                      )}
                    </Stack>
                  </Paper>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={2.5}>
                  <Stack spacing={0.5}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Inventory
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Set clear pricing and stock signals.
                    </Typography>
                  </Stack>
                  <Paper
                    elevation={0}
                    sx={{ p: 2.25, borderRadius: 2, border: "1px solid rgba(145, 158, 171, 0.18)", bgcolor: "#FFFFFF" }}
                  >
                    <Stack spacing={2}>
                      <TextField
                        label="Price"
                        value={form.price}
                        onChange={handleChange("price")}
                        type="number"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Typography component="span" sx={{ mr: 1, fontWeight: 700 }}>
                              $
                            </Typography>
                          ),
                        }}
                        required
                      />
                      <TextField
                        label="Stock"
                        value={form.stock}
                        onChange={handleChange("stock")}
                        type="number"
                        fullWidth
                        required
                      />
                      <TextField
                        label="Low stock threshold"
                        value={form.lowStockThreshold}
                        onChange={handleChange("lowStockThreshold")}
                        type="number"
                        fullWidth
                      />
                    </Stack>
                  </Paper>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddBoxRoundedIcon />}
                      sx={{ flex: 1, fontWeight: 800, py: 1.2, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
                    >
                      Save product
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ flex: 1, fontWeight: 800, py: 1.2, borderWidth: 1.5 }}
                    >
                      Clear
                    </Button>
                  </Stack>

                  {submitted && (
                    <Alert severity="success" sx={{ borderRadius: 2, fontWeight: 600 }}>
                      Product saved (mock). Category is required; wire this to your API for persistence.
                    </Alert>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
