'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Avatar,
  Paper,
  IconButton,
  Rating,
  Divider,
  TextField,
  Breadcrumbs,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Badge,
} from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

// Mock product data
const PRODUCT = {
  id: 1,
  name: 'Premium Interlocking Pavers',
  price: 3500,
  originalPrice: 5000,
  discount: 30,
  rating: 4.8,
  reviews: 234,
  sold: 1840,
  stock: 450,
  brand: 'BuildPro Ltd',
  category: 'Pavers',
  sku: 'PAV-INT-001',
  description: 'High-quality interlocking pavers perfect for driveways, pathways, and outdoor spaces. Made from premium concrete with superior durability and weather resistance.',
  images: [
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=800&fit=crop',
  ],
  specifications: [
    { label: 'Material', value: 'Premium Concrete' },
    { label: 'Dimensions', value: '200mm x 100mm x 60mm' },
    { label: 'Weight', value: '2.5 kg per piece' },
    { label: 'Color', value: 'Charcoal Grey' },
    { label: 'Surface Finish', value: 'Textured Non-Slip' },
    { label: 'Compressive Strength', value: '40 MPa' },
    { label: 'Water Absorption', value: '< 5%' },
    { label: 'Coverage', value: '50 pieces per m²' },
  ],
  features: [
    'Superior durability and longevity',
    'Weather and frost resistant',
    'Non-slip textured surface',
    'Easy to install and maintain',
    'Eco-friendly manufacturing process',
    'Available in multiple colors',
    'Suitable for vehicular traffic',
    'Interlocking design for stability',
  ],
  seller: {
    name: 'BuildPro Ltd',
    logo: 'BP',
    rating: 4.9,
    products: 1234,
    responseRate: 98,
    responseTime: '2 hours',
    color: '#FF6A00',
  },
};

// Related products
const RELATED_PRODUCTS = [
  { id: 2, name: 'Double T Pavers', price: 5200, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=300&h=300&fit=crop', rating: 4.9, reviews: 189 },
  { id: 3, name: 'Road Curbs', price: 4200, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=300&h=300&fit=crop', rating: 4.6, reviews: 156 },
  { id: 4, name: 'Concrete Blocks', price: 2800, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=300&h=300&fit=crop', rating: 4.7, reviews: 234 },
  { id: 5, name: 'Paving Stones', price: 4100, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=300&fit=crop', rating: 4.5, reviews: 198 },
];

// Customer reviews
const REVIEWS = [
  { id: 1, name: 'John Kamau', rating: 5, date: '2 days ago', comment: 'Excellent quality pavers! Used them for my driveway and they look amazing. Highly recommend BuildPro products.', verified: true },
  { id: 2, name: 'Mary Wanjiru', rating: 4, date: '1 week ago', comment: 'Good quality and fast delivery. The only issue was slight color variation in some pieces, but overall satisfied.', verified: true },
  { id: 3, name: 'David Ochieng', rating: 5, date: '2 weeks ago', comment: 'Professional grade pavers at a reasonable price. Installation was straightforward. Very happy with the purchase!', verified: true },
  { id: 4, name: 'Grace Akinyi', rating: 5, date: '3 weeks ago', comment: 'These pavers transformed my outdoor space! Durable and beautiful. Worth every shilling.', verified: true },
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(PRODUCT.stock, quantity + delta)));
  };

  return (
    <Box sx={{ bgcolor: '#F4F6F8', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            <Typography variant="body2">Home</Typography>
          </Link>
          <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2">Products</Typography>
          </Link>
          <Link href={`/products/category/${PRODUCT.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2">{PRODUCT.category}</Typography>
          </Link>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
            {PRODUCT.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  bgcolor: 'grey.50',
                }}
              >
                <Box
                  component="img"
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  sx={{
                    width: '100%',
                    height: { xs: 350, md: 500 },
                    objectFit: 'cover',
                  }}
                />
                {PRODUCT.discount > 0 && (
                  <Chip
                    label={`-${PRODUCT.discount}%`}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#FF6A00',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      px: 2,
                      py: 2.5,
                    }}
                  />
                )}
              </Box>

              {/* Thumbnail Images */}
              <Stack direction="row" spacing={1.5}>
                {PRODUCT.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      flex: 1,
                      height: { xs: 70, md: 90 },
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '3px solid',
                      borderColor: selectedImage === index ? '#FF6A00' : 'grey.200',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: '#FF6A00',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${PRODUCT.name} ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column - Product Info */}
          <Grid item xs={12} md={6} lg={7}>
            <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'white', borderRadius: 2, mb: 3 }}>
              {/* Product Title */}
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1a1a1a' }}>
                {PRODUCT.name}
              </Typography>

              {/* Brand & SKU */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  label={`Brand: ${PRODUCT.brand}`}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                <Typography variant="body2" color="text.secondary">
                  SKU: {PRODUCT.sku}
                </Typography>
              </Stack>

              {/* Rating & Reviews */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Rating value={PRODUCT.rating} precision={0.1} readOnly sx={{ color: '#FFA726' }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {PRODUCT.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({PRODUCT.reviews} reviews)
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                  {PRODUCT.sold} sold
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Product Title */}
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                {PRODUCT.name}
              </Typography>

              {/* Brand & SKU */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Brand: <Box component="span" sx={{ color: '#FF6A00' }}>{PRODUCT.brand}</Box>
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Typography variant="body2" color="text.secondary">
                  SKU: {PRODUCT.sku}
                </Typography>
              </Stack>

              {/* Rating & Reviews */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Rating value={PRODUCT.rating} precision={0.1} readOnly sx={{ color: '#FFA726' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, ml: 1 }}>
                    {PRODUCT.rating}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: '#FF6A00', fontWeight: 600 }}>
                  ({PRODUCT.reviews} reviews)
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {PRODUCT.sold} sold
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Price Section */}
              <Box sx={{ mb: 3, bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
                <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#FF6A00', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    Shs {PRODUCT.price.toLocaleString()}
                  </Typography>
                  {PRODUCT.originalPrice > PRODUCT.price && (
                    <Typography
                      variant="h5"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.disabled',
                        fontWeight: 500,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      Shs {PRODUCT.originalPrice.toLocaleString()}
                    </Typography>
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Price per unit • Tax included
                </Typography>
              </Box>

              {/* Stock Status */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                    In Stock ({PRODUCT.stock} units available)
                  </Typography>
                </Stack>
              </Box>

              {/* Quantity Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Quantity
                </Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    sx={{ 
                      border: '2px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1.5,
                      bgcolor: 'white',
                    }}
                  >
                    <IconButton 
                      onClick={() => handleQuantityChange(-1)} 
                      disabled={quantity <= 1}
                      sx={{ 
                        borderRadius: 0,
                        px: 2.5,
                        py: 1.5,
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      variant="h5"
                      sx={{
                        minWidth: 80,
                        textAlign: 'center',
                        fontWeight: 700,
                        px: 2,
                      }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton 
                      onClick={() => handleQuantityChange(1)} 
                      disabled={quantity >= PRODUCT.stock}
                      sx={{ 
                        borderRadius: 0,
                        px: 2.5,
                        py: 1.5,
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    ({PRODUCT.stock} units available)
                  </Typography>
                </Stack>
              </Box>

              {/* Add to Cart Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                  sx={{
                    bgcolor: '#FF6A00',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)',
                    '&:hover': {
                      bgcolor: '#E65F00',
                      boxShadow: '0 6px 16px rgba(255, 106, 0, 0.4)',
                    },
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 1.5,
                    borderColor: '#FF6A00',
                    color: '#FF6A00',
                    borderWidth: 2,
                    textTransform: 'none',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#E65F00',
                      bgcolor: 'rgba(255, 106, 0, 0.05)',
                    },
                  }}
                >
                  Buy Now
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Delivery & Location Info */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Delivery & Pickup
                </Typography>
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <LocalShippingIcon sx={{ color: '#FF6A00', fontSize: 24 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Free Delivery
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        For orders above Shs 50,000 within Nairobi
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <VerifiedUserIcon sx={{ color: '#FF6A00', fontSize: 24 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Quality Guarantee
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        100% authentic products from verified sellers
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Location Map */}
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Pickup Location
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'grey.300',
                        position: 'relative',
                      }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449305794!2d36.81733431475395!3d-1.2846067990638595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d673c88f3b%3A0x3106e90f81d36e47!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      📍 Industrial Area, Nairobi, Kenya
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>

            {/* Seller Information */}
            <Paper sx={{ p: 3, bgcolor: 'white', borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Sold by
              </Typography>
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: PRODUCT.seller.color,
                    fontSize: '1.5rem',
                    fontWeight: 900,
                  }}
                >
                  {PRODUCT.seller.logo}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {PRODUCT.seller.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={PRODUCT.seller.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {PRODUCT.seller.rating}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Products
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {PRODUCT.seller.products}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Response Rate
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {PRODUCT.seller.responseRate}%
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Response Time
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {PRODUCT.seller.responseTime}
                  </Typography>
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<StorefrontIcon />}
                  fullWidth
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
                  Visit Store
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ChatIcon />}
                  fullWidth
                  sx={{
                    bgcolor: '#FF6A00',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#E65F00',
                    },
                  }}
                >
                  Chat Now
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Paper sx={{ mt: 4, bgcolor: 'white', borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
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
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label={`Reviews (${PRODUCT.reviews})`} />
          </Tabs>

          <Box sx={{ p: 4 }}>
            {/* Description Tab */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Product Description
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: 'text.secondary' }}>
                  {PRODUCT.description}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Key Features
                </Typography>
                <Grid container spacing={2}>
                  {PRODUCT.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <CheckCircleIcon sx={{ color: '#FF6A00', fontSize: 20, mt: 0.3 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {feature}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Specifications Tab */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Technical Specifications
                </Typography>
                <Stack spacing={2}>
                  {PRODUCT.specifications.map((spec, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        p: 2,
                        bgcolor: index % 2 === 0 ? 'grey.50' : 'transparent',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {spec.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {spec.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Reviews Tab */}
            {tabValue === 2 && (
              <Box>
                <Stack direction="row" spacing={4} sx={{ mb: 4, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#FF6A00' }}>
                      {PRODUCT.rating}
                    </Typography>
                    <Rating value={PRODUCT.rating} precision={0.1} readOnly sx={{ color: '#FFA726', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Based on {PRODUCT.reviews} reviews
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={3}>
                  {REVIEWS.map((review) => (
                    <Box key={review.id} sx={{ pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Avatar sx={{ bgcolor: '#FF6A00', width: 48, height: 48 }}>
                          {review.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                              {review.name}
                            </Typography>
                            {review.verified && (
                              <Chip
                                label="Verified Purchase"
                                size="small"
                                icon={<CheckCircleIcon />}
                                sx={{ bgcolor: 'success.light', color: 'success.dark', height: 24 }}
                              />
                            )}
                          </Stack>
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                            <Rating value={review.rating} size="small" readOnly sx={{ color: '#FFA726' }} />
                            <Typography variant="caption" color="text.secondary">
                              {review.date}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                            {review.comment}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#FF6A00',
                      color: '#FF6A00',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': {
                        borderColor: '#E65F00',
                        bgcolor: 'rgba(255, 106, 0, 0.05)',
                      },
                    }}
                  >
                    Load More Reviews
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Related Products */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {RELATED_PRODUCTS.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        height: 40,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Stack>
                    <Typography variant="h6" sx={{ color: '#FF6A00', fontWeight: 700 }}>
                      Shs {product.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
