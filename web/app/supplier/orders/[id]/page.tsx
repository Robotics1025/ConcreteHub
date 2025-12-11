"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Chip,
  Avatar,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { getOrderById, statusMeta } from "../data";

const timelineStatusIcons = {
  success: CheckCircleIcon,
  "in-progress": AccessTimeIcon,
  pending: AccessTimeIcon,
};

const timelineStatusColors = {
  success: "#22C55E",
  "in-progress": "#0EA5E9",
  pending: "#919EAB",
};

// Payment Method Icon Component
const PaymentMethodIcon = ({ brand }: { brand: string }) => {
  const brandLower = brand.toLowerCase();

  // Card brands
  if (brandLower.includes("mastercard")) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "#EB001B",
            left: 8,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "#F79E1B",
            right: 8,
          }}
        />
      </Box>
    );
  }

  if (brandLower.includes("visa")) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: 1,
          bgcolor: "#1A1F71",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: "0.75rem",
            fontStyle: "italic",
          }}
        >
          VISA
        </Typography>
      </Box>
    );
  }

  // Mobile Money
  if (brandLower.includes("airtel")) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: 1,
          bgcolor: "#FF0000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: "0.65rem",
          }}
        >
          airtel
        </Typography>
      </Box>
    );
  }

  if (brandLower.includes("mtn")) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: 1,
          bgcolor: "#FFCC00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontWeight: 800,
            fontSize: "0.75rem",
          }}
        >
          MTN
        </Typography>
      </Box>
    );
  }

  if (brandLower.includes("amex") || brandLower.includes("american express")) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: 1,
          bgcolor: "#006FCF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: "0.65rem",
          }}
        >
          AMEX
        </Typography>
      </Box>
    );
  }

  // Default card icon
  return (
    <Box
      sx={{
        width: 48,
        height: 32,
        borderRadius: 1,
        bgcolor: "#637381",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CreditCardIcon sx={{ color: "white", fontSize: 20 }} />
    </Box>
  );
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);

  const order = getOrderById(orderId);

  const orderedStatuses = useMemo(
    () => ["pending", "completed", "cancelled", "refunded"].filter((s) => statusMeta[s as keyof typeof statusMeta]),
    []
  );

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="xl">
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid rgba(145, 158, 171, 0.16)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Order Not Found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              The order #{orderId} could not be found.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/supplier/orders")}
            >
              Back to Orders
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <style>{`
          @media print {
            /* Hide navigation and action buttons */
            .no-print {
              display: none !important;
            }
            
            /* Reset page margins and background */
            body {
              margin: 0;
              padding: 0;
              background: white !important;
            }
            
            /* Optimize container for print */
            .print-container {
              max-width: 100% !important;
              padding: 20px !important;
              background: white !important;
            }
            
            /* Remove shadows and borders for cleaner print */
            .MuiPaper-root, .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }
            
            /* Ensure proper page breaks */
            .print-section {
              page-break-inside: avoid;
            }
            
            /* Optimize table for print */
            table {
              page-break-inside: auto;
            }
            
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            
            /* Make sure images print */
            img {
              max-width: 100%;
              page-break-inside: avoid;
            }
            
            /* Adjust font sizes for print */
            body {
              font-size: 12pt;
            }
            
            h1, h2, h3, h4, h5, h6 {
              page-break-after: avoid;
            }
          }
        `}</style>
      </Head>
      <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", pb: 6 }} className="print-container">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header */}
          <Stack spacing={3} sx={{ mb: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs separator="›" sx={{ color: "#637381" }} className="no-print">
              <MuiLink
                component={Link}
                href="/supplier/dashboard"
                underline="hover"
                color="inherit"
                sx={{ fontWeight: 600 }}
              >
                Dashboard
              </MuiLink>
              <MuiLink
                component={Link}
                href="/supplier/orders"
                underline="hover"
                color="inherit"
                sx={{ fontWeight: 600 }}
              >
                Orders
              </MuiLink>
              <Typography color="text.primary" sx={{ fontWeight: 700 }}>
                #{order.id}
              </Typography>
            </Breadcrumbs>

            {/* Title and Actions */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(145, 158, 171, 0.12)",
                boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={2}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton
                    onClick={() => router.push("/supplier/orders")}
                    className="no-print"
                    sx={{
                      bgcolor: "#F2F4F7",
                      border: "1px solid rgba(145, 158, 171, 0.16)",
                      "&:hover": {
                        bgcolor: "#E5E7EB",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        Order #{order.id}
                      </Typography>
                      <Chip
                        label={statusMeta[order.status].label}
                        sx={{
                          bgcolor: statusMeta[order.status].bg,
                          color: statusMeta[order.status].color,
                          fontWeight: 700,
                          borderRadius: 2,
                          px: 1.5,
                          fontSize: "0.9rem",
                          minHeight: 36,
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, fontWeight: 600 }}>
                      {new Date(order.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })} {order.time}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.25} alignItems="center" className="no-print">
                  <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => setStatusAnchor(e.currentTarget)}
                    sx={{
                      borderColor: "rgba(145, 158, 171, 0.24)",
                      color: "#212B36",
                      fontWeight: 700,
                      borderRadius: 2,
                      minWidth: 140,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "rgba(145, 158, 171, 0.32)",
                        bgcolor: alpha("#919EAB", 0.08),
                      },
                    }}
                  >
                    {statusMeta[order.status].label}
                  </Button>
                  <Menu
                    anchorEl={statusAnchor}
                    open={Boolean(statusAnchor)}
                    onClose={() => setStatusAnchor(null)}
                  >
                    {orderedStatuses.map((statusKey) => {
                      const meta = statusMeta[statusKey as keyof typeof statusMeta];
                      return (
                        <MenuItem key={statusKey} onClick={() => setStatusAnchor(null)}>
                          <Chip
                            label={meta.label}
                            size="small"
                            sx={{
                              bgcolor: meta.bg,
                              color: meta.color,
                              fontWeight: 700,
                              borderRadius: 2,
                              mr: 1,
                            }}
                          />
                          {meta.label}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    sx={{
                      borderColor: "rgba(145, 158, 171, 0.24)",
                      color: "#212B36",
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "rgba(145, 158, 171, 0.32)",
                        bgcolor: alpha("#919EAB", 0.08),
                      },
                    }}
                  >
                    Print
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                      bgcolor: "#111827",
                      borderRadius: 2,
                      fontWeight: 800,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#0f172a",
                      },
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Paper>

          </Stack>

          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                {/* Order Items */}
                <Box className="print-section">
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                    Order Items
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid rgba(145, 158, 171, 0.12)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#FAFAFA" }}>
                          <TableCell sx={{ fontWeight: 700, color: "#637381", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }}>
                            Product
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#637381", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }} align="center">
                            Qty
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#637381", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }} align="right">
                            Price
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#637381", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5 }} align="right">
                            Total
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.itemsDetail.map((item, index) => (
                          <TableRow key={index} sx={{ "&:hover": { bgcolor: "#FAFAFA" } }}>
                            <TableCell sx={{ py: 2 }}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 1.5,
                                    objectFit: "cover",
                                    border: "1px solid rgba(145, 158, 171, 0.08)",
                                  }}
                                />
                                <Box>
                                  <Typography sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                                    {item.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    SKU: {item.sku}
                                  </Typography>
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, color: "#101828" }}>
                              {item.quantity}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, color: "#637381" }}>
                              ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700, color: "#101828", fontSize: "0.9375rem" }}>
                              ${(item.quantity * item.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Box>

                {/* Order Timeline */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                    Order Timeline
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid rgba(145, 158, 171, 0.12)",
                      p: 3,
                    }}
                  >
                    <Stack spacing={3}>
                      {order.history.map((event, index) => {
                        const StatusIcon = event.status
                          ? timelineStatusIcons[event.status]
                          : AccessTimeIcon;
                        const statusColor = event.status
                          ? timelineStatusColors[event.status]
                          : "#919EAB";

                        return (
                          <Stack key={index} direction="row" spacing={2}>
                            <Box
                              sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  bgcolor: alpha(statusColor, 0.12),
                                  border: `2px solid ${alpha(statusColor, 0.24)}`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  zIndex: 1,
                                }}
                              >
                                <StatusIcon sx={{ color: statusColor, fontSize: 18 }} />
                              </Box>
                              {index < order.history.length - 1 && (
                                <Box
                                  sx={{
                                    width: 2,
                                    flex: 1,
                                    bgcolor: "rgba(145, 158, 171, 0.2)",
                                    mt: 1,
                                    minHeight: 24,
                                  }}
                                />
                              )}
                            </Box>
                            <Box sx={{ flex: 1, pb: index < order.history.length - 1 ? 0 : 0 }}>
                              <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem", mb: 0.5 }}>
                                {event.label}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {new Date(event.datetime).toLocaleString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </Typography>
                            </Box>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Stack spacing={4}>
                {/* Customer Info */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                    Customer
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid rgba(145, 158, 171, 0.12)",
                      p: 3,
                    }}
                  >
                    <Stack spacing={2.5}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={order.customerAvatar}
                          alt={order.customerName}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem" }}>
                            {order.customerName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {order.customerEmail}
                          </Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ borderColor: "rgba(145, 158, 171, 0.08)" }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          Phone
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#101828" }}>{order.phone}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          IP Address
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#101828" }}>{order.ipAddress}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                {/* Shipping Info */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
                    <LocalShippingIcon sx={{ color: "#637381", fontSize: 20 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Shipping
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid rgba(145, 158, 171, 0.12)",
                      p: 3,
                    }}
                  >
                    <Stack spacing={2.5}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          Address
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                          {order.address.line1}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                          {order.address.city}, {order.address.state} {order.address.postalCode}
                        </Typography>
                      </Box>
                      <Divider sx={{ borderColor: "rgba(145, 158, 171, 0.08)" }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          Delivery Method
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                          {order.deliveryMethod}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          Tracking Number
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Chip
                            label={order.carrier}
                            size="small"
                            sx={{
                              bgcolor: alpha("#0EA5E9", 0.12),
                              color: "#0EA5E9",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: 1.5,
                            }}
                          />
                          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#101828" }}>
                            {order.trackingNumber}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                {/* Payment Info */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                    Payment
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid rgba(145, 158, 171, 0.12)",
                      p: 3,
                    }}
                  >
                    <Stack spacing={2.5}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
                          Payment Method
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <PaymentMethodIcon brand={order.paymentBrand} />
                          <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                            {order.paymentBrand} •••• {order.paymentLast4}
                          </Typography>
                        </Stack>
                      </Box>
                      <Divider sx={{ borderColor: "rgba(145, 158, 171, 0.08)" }} />
                      <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Subtotal</Typography>
                          <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                            ${order.subtotal.toFixed(2)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Shipping</Typography>
                          <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                            ${order.shipping.toFixed(2)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Tax</Typography>
                          <Typography sx={{ fontWeight: 600, color: "#101828" }}>
                            ${order.tax.toFixed(2)}
                          </Typography>
                        </Stack>
                        {order.discount > 0 && (
                          <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Discount</Typography>
                            <Typography sx={{ fontWeight: 600, color: "#22C55E" }}>
                              -${order.discount.toFixed(2)}
                            </Typography>
                          </Stack>
                        )}
                        <Divider sx={{ borderColor: "rgba(145, 158, 171, 0.08)" }} />
                        <Stack direction="row" justifyContent="space-between" sx={{ pt: 0.5 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                            Total
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "1.375rem",
                              color: "#FF6A00",
                            }}
                          >
                            ${order.total.toFixed(2)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
