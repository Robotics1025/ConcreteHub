'use client';

import { use, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Breadcrumbs,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PRODUCTS_BY_CATEGORY = [
  { id: 1, name: 'Interlocking Pavers Premium', price: 3500, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', rating: 4.5, reviews: 234, badge: 'Popular' },
  { id: 2, name: 'S Pavers - Heavy Duty', price: 4500, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop', rating: 4.8, reviews: 189, badge: 'Best Seller' },
  { id: 3, name: 'Double T Pavers', price: 5200, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop', rating: 4.9, reviews: 267, badge: 'Top Rated' },
  { id: 4, name: 'Hexagonal Pavers', price: 4800, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop', rating: 4.6, reviews: 156, badge: null },
  { id: 5, name: 'Zigzag Pavers', price: 4200, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', rating: 4.7, reviews: 198, badge: 'New' },
  { id: 6, name: 'Rectangular Pavers', price: 3800, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop', rating: 4.5, reviews: 223, badge: null },
  { id: 7, name: 'Uni Pavers', price: 4100, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop', rating: 4.8, reviews: 245, badge: 'Popular' },
  { id: 8, name: 'Classic Pavers', price: 3600, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop', rating: 4.4, reviews: 178, badge: null },
  { id: 9, name: 'Diamond Pavers', price: 5500, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', rating: 4.9, reviews: 312, badge: 'Premium' },
  { id: 10, name: 'Circular Pavers', price: 4900, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop', rating: 4.7, reviews: 189, badge: null },
  { id: 11, name: 'Wave Pavers', price: 4400, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop', rating: 4.6, reviews: 201, badge: null },
  { id: 12, name: 'Grid Pavers', price: 3900, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop', rating: 4.5, reviews: 167, badge: 'Best Value' },
];

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const categoryName = decodeURIComponent(name);

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
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
            {categoryName}
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textTransform: 'capitalize' }}>
            {categoryName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Showing {PRODUCTS_BY_CATEGORY.length} products
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={2.5} lg={2}>
            <Paper sx={{ bgcolor: 'white', borderRadius: 1, position: 'sticky', top: 100, overflow: 'hidden', boxShadow: 1 }}>
              {/* Filter Header */}
              <Box sx={{ bgcolor: '#FF6A00', color: 'white', px: 1.5, py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FilterListIcon sx={{ fontSize: 18 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                    Filters
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 1.5 }}>
                <Stack spacing={1.5}>
                  {/* Price Range */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>
                      Price Range
                    </Typography>
                    <Box sx={{ px: 0.5 }}>
                      <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue as number[])}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `Shs ${value.toLocaleString()}`}
                        min={0}
                        max={10000}
                        step={500}
                        sx={{
                          color: '#FF6A00',
                          height: 4,
                          '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                          },
                          '& .MuiSlider-valueLabel': {
                            bgcolor: '#FF6A00',
                            fontSize: '0.75rem',
                          },
                        }}
                      />
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                        <Box
                          sx={{
                            flex: 1,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 0.5,
                            px: 1,
                            py: 0.5,
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            Shs {priceRange[0].toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 0.5,
                            px: 1,
                            py: 0.5,
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            Shs {priceRange[1].toLocaleString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Rating Filter */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>
                      Rating
                    </Typography>
                    <Stack spacing={0.3}>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Box
                          key={rating}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 0.5,
                            px: 0.75,
                            cursor: 'pointer',
                            borderRadius: 0.5,
                            transition: 'all 0.2s',
                            '&:hover': {
                              bgcolor: 'rgba(255, 106, 0, 0.05)',
                            },
                          }}
                        >
                          <Stack direction="row" spacing={0.3} alignItems="center">
                            <Rating value={rating} readOnly size="small" sx={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
                              & Up
                            </Typography>
                          </Stack>
                          <Checkbox
                            size="small"
                            sx={{
                              p: 0,
                              color: 'grey.400',
                              '&.Mui-checked': { color: '#FF6A00' },
                              '& .MuiSvgIcon-root': { fontSize: 16 },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  <Divider />

                  {/* Availability */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>
                      Availability
                    </Typography>
                    <Stack spacing={0.3}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 0.5,
                          px: 0.75,
                          cursor: 'pointer',
                          borderRadius: 0.5,
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(255, 106, 0, 0.05)',
                          },
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                          In Stock
                        </Typography>
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            p: 0,
                            color: 'grey.400',
                            '&.Mui-checked': { color: '#FF6A00' },
                            '& .MuiSvgIcon-root': { fontSize: 16 },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 0.5,
                          px: 0.75,
                          cursor: 'pointer',
                          borderRadius: 0.5,
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(255, 106, 0, 0.05)',
                          },
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                          Out of Stock
                        </Typography>
                        <Checkbox
                          size="small"
                          sx={{
                            p: 0,
                            color: 'grey.400',
                            '&.Mui-checked': { color: '#FF6A00' },
                            '& .MuiSvgIcon-root': { fontSize: 16 },
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: '#FF6A00',
                      color: 'white',
                      fontWeight: 600,
                      py: 0.75,
                      mt: 0.5,
                      fontSize: '0.75rem',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#E65F00',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Reset All Filters
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} md={9.5} lg={10}>
            {/* Sort Options */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {PRODUCTS_BY_CATEGORY.length} Products Found
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Products */}
            <Grid container spacing={2}>
              {PRODUCTS_BY_CATEGORY.map((product) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                  <Card
                    component={Link}
                    href={`/products/${product.id}`}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      borderRadius: 2,
                      textDecoration: 'none',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                        borderColor: '#FF6A00',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                      {product.badge && (
                        <Chip
                          label={product.badge}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            bgcolor: product.badge === 'Best Seller' ? '#FF6A00' : 
                                    product.badge === 'New' ? '#00C853' : 
                                    product.badge === 'Top Rated' ? '#1976d2' :
                                    product.badge === 'Premium' ? '#7b1fa2' : '#FFA726',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: 'white',
                          borderRadius: '50%',
                          p: 0.5,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 20, color: 'grey.500' }} />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
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

            {/* Load More */}
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#FF6A00',
                  color: '#FF6A00',
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#E65F00',
                    borderWidth: 2,
                    bgcolor: 'rgba(255, 106, 0, 0.05)',
                  },
                }}
              >
                Load More Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
