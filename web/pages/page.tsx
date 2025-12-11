'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Chip,
  Avatar,
  Paper,
  IconButton,
  Rating,
  alpha,
  TextField,
  InputAdornment,
  Badge,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HelpIcon from '@mui/icons-material/Help';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import NewsletterPopup from '@/components/NewsletterPopup';

// Categories
const CATEGORIES = [
  { name: 'Cement & Concrete', icon: <ConstructionIcon />, count: 234, color: '#FF6A00' },
  { name: 'Building Materials', icon: <HomeWorkIcon />, count: 456, color: '#00695c' },
  { name: 'Tools & Equipment', icon: <BuildIcon />, count: 189, color: '#1976d2' },
  { name: 'Steel & Iron', icon: <EngineeringIcon />, count: 321, color: '#d32f2f' },
  { name: 'Architecture', icon: <AccountBalanceIcon />, count: 156, color: '#7b1fa2' },
  { name: 'Hardware', icon: <CategoryIcon />, count: 678, color: '#f57c00' },
];

// Flash Deals
const FLASH_DEALS = [
  {
    id: 1,
    name: 'Premium Portland Cement 50kg',
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    rating: 4.8,
    sold: 2340,
    stock: 45,
    timeLeft: '2h 30m',
  },
  {
    id: 2,
    name: 'Steel Rebar Bundle 12mm x 6m',
    price: 249.99,
    originalPrice: 350.00,
    discount: 29,
    rating: 4.9,
    sold: 1890,
    stock: 23,
    timeLeft: '5h 15m',
  },
  {
    id: 3,
    name: 'Ready-Mix Concrete Premium',
    price: 165.00,
    originalPrice: 200.00,
    discount: 18,
    rating: 4.7,
    sold: 3456,
    stock: 67,
    timeLeft: '1h 45m',
  },
  {
    id: 4,
    name: 'Construction Blocks 100 Pack',
    price: 179.99,
    originalPrice: 220.00,
    discount: 18,
    rating: 4.6,
    sold: 1234,
    stock: 89,
    timeLeft: '3h 20m',
  },
];

// Trending Products
const TRENDING = [
  { id: 1, name: 'Power Drill Set Professional', price: 299.99, rating: 4.9, reviews: 567, badge: 'Best Seller' },
  { id: 2, name: 'Construction Safety Helmet', price: 45.00, rating: 4.7, reviews: 234, badge: 'Top Rated' },
  { id: 3, name: 'Measuring Tape Digital 100m', price: 78.50, rating: 4.8, reviews: 445, badge: 'Hot Deal' },
  { id: 4, name: 'Paint Spray Gun Professional', price: 189.00, rating: 4.6, reviews: 198, badge: 'New Arrival' },
];

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: '#F4F6F8', minHeight: '100vh' }}>
      {/* Newsletter Popup */}
      <NewsletterPopup delay={3000} customerType="customer" />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Top Info Bar */}
      <Box sx={{ bgcolor: '#212B36', color: 'white', py: 1 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ fontSize: '0.875rem' }}>
            <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">0800-CONCRETE</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <EmailIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">support@concretehub.com</Typography>
              </Stack>
            </Stack>
            <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
              🎉 Free delivery on orders over $500
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' } }}>Follow us:</Typography>
              <Stack direction="row" spacing={1}>
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, idx) => (
                  <IconButton key={idx} size="small" sx={{ color: 'white', p: 0.5 }}>
                    <Icon sx={{ fontSize: 16 }} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Main Header - Jumia Style */}
      <Box
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={3} sx={{ py: 2 }}>
            {/* Logo - ConcreteHub */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                minWidth: { xs: 120, md: 180 },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ConstructionIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                ConcreteHub
              </Typography>
            </Box>

            {/* Jumia-Style Search Bar */}
            <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    boxShadow: '0 0 0 2px rgba(255, 106, 0, 0.1)',
                  },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search products, brands and categories"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      '& fieldset': { border: 'none' },
                      bgcolor: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 0,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#FF6A00',
                    color: 'white',
                    px: 4,
                    borderRadius: 0,
                    minWidth: 100,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#E65F00',
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            {/* Right Actions - Jumia Style */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<PersonIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                Account
              </Button>

              <Button
                startIcon={<HelpIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  display: { xs: 'none', lg: 'flex' },
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                Help
              </Button>

              <IconButton sx={{ color: 'text.primary' }}>
                <Badge badgeContent={5} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ animation: 'fadeInUp 0.8s ease-out' }}>
                <Chip
                  icon={<LocalOfferIcon />}
                  label="MEGA SALE - UP TO 50% OFF"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    px: 1,
                    fontSize: '0.875rem',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  Build Your
                  <br />
                  Dreams Today
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 400, maxWidth: 500 }}>
                  Premium construction materials, tools, and equipment. Quality guaranteed with
                  nationwide delivery.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    component={Link}
                    href="/ecommerce/products"
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s',
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Shop Now
                  </Button>
                  <Button
                    component={Link}
                    href="/dashboard"
                    size="large"
                    variant="outlined"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 700,
                      px: 4,
                      borderWidth: 2,
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.15)', borderWidth: 2 },
                    }}
                  >
                    Dashboard
                  </Button>
                </Stack>
                <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                  {[
                    { value: '10K+', label: 'Products' },
                    { value: '50K+', label: 'Happy Customers' },
                    { value: '24/7', label: 'Support' },
                  ].map((stat, idx) => (
                    <Box key={idx}>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 280, md: 400 },
                    height: { xs: 280, md: 400 },
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    animation: 'float 3s ease-in-out infinite',
                  }}
                >
                  <ConstructionIcon sx={{ fontSize: { xs: 120, md: 180 }, opacity: 0.6 }} />
                </Box>
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    p: 2,
                    bgcolor: 'white',
                    animation: 'float 4s ease-in-out infinite',
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                    50% OFF
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: { xs: '5%', md: '10%' },
                    p: 2,
                    bgcolor: 'white',
                    animation: 'float 3.5s ease-in-out infinite',
                    boxShadow: 3,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VerifiedUserIcon color="success" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Quality Guaranteed
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={3}>
          {[
            { icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, title: 'Free Delivery', desc: 'On orders over $500', color: '#1976d2' },
            { icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />, title: 'Secure Payment', desc: '100% Protected', color: '#2e7d32' },
            { icon: <SupportAgentIcon sx={{ fontSize: 40 }} />, title: '24/7 Support', desc: 'Dedicated support', color: '#ed6c02' },
            { icon: <LocalOfferIcon sx={{ fontSize: 40 }} />, title: 'Best Prices', desc: 'Guaranteed low prices', color: '#d32f2f' },
          ].map((feature, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)} 0%, ${alpha(feature.color, 0.05)} 100%)`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Shop by Category
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse our extensive range of construction materials
            </Typography>
          </Box>
          <Button endIcon={<ArrowForwardIcon />} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            View All
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {CATEGORIES.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    '& .category-icon': { transform: 'scale(1.1)' },
                  },
                }}
              >
                <CardContent>
                  <Box
                    className="category-icon"
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(category.color, 0.1)} 0%, ${alpha(category.color, 0.05)} 100%)`,
                      color: category.color,
                      transition: 'transform 0.3s',
                      fontSize: { xs: 32, md: 40 },
                      '& svg': { fontSize: 'inherit' },
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {category.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {category.count} items
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Flash Deals */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  fontWeight: 800,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                ⚡ FLASH DEALS
              </Box>
              <Chip
                label="Time Limited"
                color="error"
                sx={{ fontWeight: 700, animation: 'pulse 2s infinite', display: { xs: 'none', sm: 'inline-flex' } }}
              />
            </Stack>
            <Button
              endIcon={<ArrowForwardIcon />}
              component={Link}
              href="/ecommerce/products"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              See All Deals
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {FLASH_DEALS.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CategoryIcon sx={{ fontSize: 80, color: 'grey.400' }} />
                    </CardMedia>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'error.main',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 800,
                        fontSize: '1rem',
                      }}
                    >
                      -{product.discount}%
                    </Box>
                    <Chip
                      label={`${product.stock} left`}
                      size="small"
                      color="warning"
                      sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700 }}
                    />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {product.timeLeft}
                      </Typography>
                    </Stack>
                  </Box>

                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, height: 40 }}>
                      {product.name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        ({product.sold})
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 2 }}>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                        ${product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    </Stack>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
                        fontWeight: 700,
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Promotional Banners */}
      <Container maxWidth="xl" sx={{ my: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 250,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="overline" sx={{ opacity: 0.9 }}>
                  Super Deal
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.75rem', md: '3rem' } }}>
                  Get 40% Off
                  <br />
                  Building Materials
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Limited time offer on selected construction materials
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: -50,
                  top: -50,
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.1)',
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                minHeight: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Top Trending
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Explore the most popular products this week
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Trending Products */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Trending Products
        </Typography>

        <Grid container spacing={3}>
          {TRENDING.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                      #{product.id}
                    </Avatar>
                    <Chip label={product.badge} color="primary" size="small" sx={{ fontWeight: 700 }} />
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">
                      ({product.reviews})
                    </Typography>
                  </Stack>
                  <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                ConcreteHub
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Your trusted partner for premium construction materials and equipment.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, idx) => (
                  <IconButton key={idx} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                    <Icon />
                  </IconButton>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                {[
                  { title: 'Shop', items: ['Products', 'Categories', 'Deals', 'New Arrivals'] },
                  { title: 'Company', items: ['About Us', 'Contact', 'Careers', 'Blog'] },
                  { title: 'Support', items: ['Help Center', 'Shipping', 'Returns', 'FAQ'] },
                  { title: 'Legal', items: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'] },
                ].map((section, idx) => (
                  <Grid item xs={6} md={3} key={idx}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                      {section.title}
                    </Typography>
                    <Stack spacing={1}>
                      {section.items.map((item) => (
                        <Typography
                          key={item}
                          variant="body2"
                          sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2025 ConcreteHub. All rights reserved. Built with Material-UI & Next.js
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
