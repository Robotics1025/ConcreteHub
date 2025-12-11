'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '../components/AuthModal';
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

// Categories
const CATEGORIES = [
  { name: 'Pavers', icon: <CategoryIcon />, count: 234, color: '#FF6A00' },
  { name: 'Culverts', icon: <HomeWorkIcon />, count: 456, color: '#00695c' },
  { name: 'Slabs', icon: <BuildIcon />, count: 189, color: '#1976d2' },
  { name: 'Blocks', icon: <ConstructionIcon />, count: 321, color: '#d32f2f' },
  { name: 'Facing Poles', icon: <EngineeringIcon />, count: 156, color: '#7b1fa2' },
  { name: 'Road Curbs', icon: <AccountBalanceIcon />, count: 678, color: '#f57c00' },
];

// Flash Deals
const FLASH_DEALS = [
  {
    id: 1,
    name: 'S Pavers - Premium Quality',
    price: 4500,
    originalPrice: 6000,
    discount: 25,
    rating: 4.8,
    sold: 2340,
    stock: 45,
    timeLeft: '2h 30m',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Double T Pavers - Heavy Duty',
    price: 5200,
    originalPrice: 7300,
    discount: 29,
    rating: 4.9,
    sold: 1890,
    stock: 23,
    timeLeft: '5h 15m',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Concrete Culverts 900mm',
    price: 8500,
    originalPrice: 10500,
    discount: 19,
    rating: 4.7,
    sold: 3456,
    stock: 67,
    timeLeft: '1h 45m',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Medium Slabs 600x600mm',
    price: 3800,
    originalPrice: 4650,
    discount: 18,
    rating: 4.6,
    sold: 1234,
    stock: 89,
    timeLeft: '3h 20m',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
  },
];

// Trending Products
const TRENDING = [
  { id: 1, name: 'Power Drill Set Professional', price: 299.99, rating: 4.9, reviews: 567, badge: 'Best Seller' },
  { id: 2, name: 'Construction Safety Helmet', price: 45.00, rating: 4.7, reviews: 234, badge: 'Top Rated' },
  { id: 3, name: 'Measuring Tape Digital 100m', price: 78.50, rating: 4.8, reviews: 445, badge: 'Hot Deal' },
  { id: 4, name: 'Paint Spray Gun Professional', price: 189.00, rating: 4.6, reviews: 198, badge: 'New Arrival' },
];

// Carousel Slides
const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Build Your Dreams Today',
    subtitle: 'New Season Collection',
    description: 'Premium construction materials at unbeatable prices. Get started on your next project.',
    buttonText: 'Shop Now',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    image: '🏗️',
  },
  {
    id: 2,
    title: 'Mega Sale - Up to 50% Off',
    subtitle: 'Limited Time Offer',
    description: 'Grab the best deals on construction equipment and materials. Hurry, offer ends soon!',
    buttonText: 'Grab Deals',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    image: '🎉',
  },
  {
    id: 3,
    title: 'Professional Tools Collection',
    subtitle: 'For The Experts',
    description: 'Industry-grade tools and equipment trusted by professionals worldwide.',
    buttonText: 'Explore Tools',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    image: '🔧',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleAuthSuccess = () => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      // Add to cart logic
      alert('Added to cart!');
    }
  };

  const handleBuyNow = (productId: number) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      router.push(`/products/${productId}`);
    }
  };
  return (
    <Box sx={{ bgcolor: '#F4F6F8', minHeight: '100vh' }}>
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

      {/* Hero Carousel Section - Auto Sliding */}
      <Box sx={{ bgcolor: 'white', pt: 2, pb: 6 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              height: { xs: 350, md: 500 },
            }}
          >
            {/* Slides Container */}
            {CAROUSEL_SLIDES.map((slide, index) => (
              <Box
                key={slide.id}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: slide.background,
                  opacity: currentSlide === index ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Container maxWidth="xl">
                  <Grid container spacing={4} alignItems="center">
                    {/* Left Content */}
                    <Grid item xs={12} md={7}>
                      <Box sx={{ color: 'white', pr: { md: 4 } }}>
                        <Typography
                          variant="overline"
                          sx={{
                            color: 'rgba(255,255,255,0.95)',
                            fontWeight: 700,
                            letterSpacing: 3,
                            mb: 1,
                            display: 'block',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                          }}
                        >
                          {slide.subtitle}
                        </Typography>
                        <Typography
                          variant="h1"
                          sx={{
                            fontWeight: 900,
                            mb: 3,
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                            lineHeight: 1.1,
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                          }}
                        >
                          {slide.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 4,
                            opacity: 0.95,
                            fontWeight: 400,
                            maxWidth: 500,
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            lineHeight: 1.6,
                          }}
                        >
                          {slide.description}
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Button
                            variant="contained"
                            size="large"
                            sx={{
                              bgcolor: 'white',
                              color: 'primary.main',
                              px: 5,
                              py: 2,
                              fontWeight: 800,
                              fontSize: '1.1rem',
                              borderRadius: 2,
                              textTransform: 'uppercase',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                              '&:hover': {
                                bgcolor: 'grey.100',
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                              },
                              transition: 'all 0.3s',
                            }}
                          >
                            {slide.buttonText}
                          </Button>
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{
                              borderColor: 'white',
                              borderWidth: 2,
                              color: 'white',
                              px: 5,
                              py: 2,
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              borderRadius: 2,
                              '&:hover': {
                                borderColor: 'white',
                                borderWidth: 2,
                                bgcolor: 'rgba(255,255,255,0.15)',
                                transform: 'translateY(-4px)',
                              },
                              transition: 'all 0.3s',
                            }}
                          >
                            Learn More
                          </Button>
                        </Stack>

                        {/* Stats - Only on first slide */}
                        {index === 0 && (
                          <Stack
                            direction="row"
                            spacing={4}
                            sx={{
                              mt: 5,
                              pt: 4,
                              borderTop: '2px solid rgba(255,255,255,0.3)',
                              display: { xs: 'none', md: 'flex' },
                            }}
                          >
                            {[
                              { value: '10K+', label: 'Products' },
                              { value: '50K+', label: 'Happy Customers' },
                              { value: '24/7', label: 'Support' },
                            ].map((stat, idx) => (
                              <Box key={idx}>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>
                                  {stat.value}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                  {stat.label}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        )}
                      </Box>
                    </Grid>

                    {/* Right Image/Icon */}
                    <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                      <Box
                        sx={{
                          fontSize: { md: '15rem', lg: '20rem' },
                          textAlign: 'center',
                          opacity: 0.3,
                          animation: 'float 3s ease-in-out infinite',
                          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                        }}
                      >
                        {slide.image}
                      </Box>
                    </Grid>
                  </Grid>
                </Container>

                {/* Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: -100,
                    top: -100,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: -50,
                    bottom: -50,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '1s',
                  }}
                />
              </Box>
            ))}

            {/* Navigation Arrows */}
            <IconButton
              onClick={() => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                width: { xs: 40, md: 56 },
                height: { xs: 40, md: 56 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
                transition: 'all 0.3s',
                zIndex: 10,
              }}
            >
              {'<'}
            </IconButton>
            <IconButton
              onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                width: { xs: 40, md: 56 },
                height: { xs: 40, md: 56 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
                transition: 'all 0.3s',
                zIndex: 10,
              }}
            >
              {'>'}
            </IconButton>

            {/* Carousel Indicators */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              {CAROUSEL_SLIDES.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  sx={{
                    width: currentSlide === idx ? 40 : 12,
                    height: 12,
                    borderRadius: 6,
                    bgcolor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    '&:hover': { bgcolor: 'white' },
                    boxShadow: currentSlide === idx ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

     

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

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'grey.200',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.main',
              borderRadius: 4,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          {CATEGORIES.map((category, index) => (
            <Card
              key={index}
              component={Link}
              href={`/products/category/${category.name.toLowerCase()}`}
              sx={{
                minWidth: { xs: 140, md: 180 },
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
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
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Flash Deals */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  bgcolor: '#FF6A00',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 800,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)',
                }}
              >
                ⚡ FLASH DEALS
              </Box>
              <Chip
                label="Time Limited"
                sx={{ 
                  bgcolor: '#FFE6D9',
                  color: '#FF6A00',
                  fontWeight: 700,
                  animation: 'pulse 2s infinite',
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderRadius: 2,
                }}
              />
            </Stack>
            <Button
              endIcon={<ArrowForwardIcon />}
              component={Link}
              href="/ecommerce/products"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: '#FF6A00',
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(255, 106, 0, 0.05)' },
              }}
            >
              See All Deals
            </Button>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              pb: 2,
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'grey.200',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: '#FF6A00',
                borderRadius: 4,
                '&:hover': {
                  bgcolor: '#E65F00',
                },
              },
            }}
          >
            {FLASH_DEALS.map((product) => (
              <Card
                key={product.id}
                component={Link}
                href={`/products/${product.id}`}
                sx={{
                  minWidth: { xs: 260, sm: 280, md: 300 },
                  transition: 'all 0.3s',
                  borderRadius: 2,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: 220,
                      objectFit: 'cover',
                      bgcolor: 'grey.100',
                    }}
                  />
                  
                  {/* Stock Badge */}
                  <Chip
                    label={`${product.stock} left`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: '#FFA726',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                  
                  {/* Discount Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: '#FF6A00',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 8px rgba(255, 106, 0, 0.4)',
                    }}
                  >
                    -{product.discount}%
                  </Box>
                  
                  {/* Timer */}
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      bgcolor: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1.5,
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                      {product.timeLeft}
                    </Typography>
                  </Stack>
                </Box>

                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      height: 48,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.4,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ color: '#FFA726' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      ({product.sold})
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="baseline" spacing={1.5} sx={{ mb: 2.5 }}>
                    <Typography variant="h5" sx={{ color: '#FF6A00', fontWeight: 900, fontSize: '1.75rem' }}>
                      Shs {product.price.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.disabled',
                        fontWeight: 500,
                      }}
                    >
                      Shs {product.originalPrice.toLocaleString()}
                    </Typography>
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      bgcolor: '#FF6A00',
                      color: 'white',
                      fontWeight: 700,
                      py: 1.2,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)',
                      '&:hover': {
                        bgcolor: '#E65F00',
                        boxShadow: '0 6px 16px rgba(255, 106, 0, 0.4)',
                      },
                    }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
            {/* des gin  th all products liketo be 6 cloumns */}
            {/*also mn  i need the top supplliers to be i thinksin circlers an theit names */}
    
      {/* All Products Section - Enhanced Design */}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: { xs: 3, md: 5 }, px: { xs: 1, sm: 0 } }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: '#1a1a1a', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
              All Products
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Explore our complete range of construction materials
            </Typography>
          </Box>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              color: '#FF6A00', 
              fontWeight: 700,
              bgcolor: 'rgba(255, 106, 0, 0.08)',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'rgba(255, 106, 0, 0.15)',
              }
            }}
          >
            View All
          </Button>
        </Stack>

        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          {[
            { name: 'Interlocking Pavers', price: 3500, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', rating: 4.5, reviews: 234, badge: 'Popular' },
            { name: 'Concrete Blocks', price: 2800, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop', rating: 4.7, reviews: 456, badge: 'Best Seller' },
            { name: 'Road Curbs', price: 4200, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop', rating: 4.6, reviews: 189, badge: null },
            { name: 'Precast Slabs', price: 5600, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop', rating: 4.8, reviews: 321, badge: 'New' },
            { name: 'Drainage Culverts', price: 7800, image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=400&fit=crop', rating: 4.9, reviews: 267, badge: 'Top Rated' },
            { name: 'Facing Poles', price: 6500, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop', rating: 4.4, reviews: 145, badge: null },
            { name: 'Hollow Blocks', price: 3200, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', rating: 4.6, reviews: 298, badge: 'Popular' },
            { name: 'Paving Stones', price: 4100, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop', rating: 4.7, reviews: 412, badge: null },
            { name: 'Kerb Stones', price: 3900, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop', rating: 4.5, reviews: 176, badge: null },
            { name: 'Wall Panels', price: 8900, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop', rating: 4.8, reviews: 234, badge: 'Premium' },
            { name: 'Concrete Pipes', price: 5200, image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=400&fit=crop', rating: 4.6, reviews: 198, badge: null },
            { name: 'Ballast Mix', price: 2500, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop', rating: 4.9, reviews: 567, badge: 'Best Value' },
          ].map((product, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card
                component={Link}
                href={`/products/${index + 1}`}
                sx={{
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: { xs: 1.5, md: 2 },
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: { xs: 'translateY(-4px)', md: 'translateY(-12px)' },
                    boxShadow: { xs: 4, md: '0 16px 32px rgba(0,0,0,0.12)' },
                    borderColor: '#FF6A00',
                    '& .product-image': {
                      transform: 'scale(1.1)',
                    },
                    '& .add-to-cart-btn': {
                      opacity: { xs: 0, md: 1 },
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'grey.100' }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    className="product-image"
                    sx={{
                      height: { xs: 140, sm: 160, md: 180 },
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <Chip
                      label={product.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: { xs: 6, md: 10 },
                        left: { xs: 6, md: 10 },
                        bgcolor: product.badge === 'Best Seller' ? '#FF6A00' : 
                                product.badge === 'New' ? '#00C853' : 
                                product.badge === 'Top Rated' ? '#1976d2' :
                                product.badge === 'Premium' ? '#7b1fa2' : '#FFA726',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '0.6rem', md: '0.7rem' },
                        height: { xs: 20, md: 24 },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    />
                  )}

                  {/* Quick Add Button - Hidden on mobile */}
                  <IconButton
                    className="add-to-cart-btn"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      bgcolor: '#FF6A00',
                      color: 'white',
                      opacity: 0,
                      transform: 'translateY(10px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(255,106,0,0.4)',
                      display: { xs: 'none', md: 'flex' },
                      '&:hover': {
                        bgcolor: '#E65F00',
                        transform: 'translateY(0) scale(1.1)',
                      },
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Box>

                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: { xs: 1, md: 1.5 },
                      height: { xs: 34, md: 40 },
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.3,
                      color: '#1a1a1a',
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: { xs: 1, md: 1.5 } }}>
                    <Rating 
                      value={product.rating} 
                      precision={0.1} 
                      size="small" 
                      readOnly 
                      sx={{ 
                        fontSize: { xs: '0.75rem', md: '1rem' },
                        '& .MuiRating-iconFilled': {
                          color: '#FFA726',
                        }
                      }} 
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.7rem' }, fontWeight: 600 }}>
                      ({product.reviews})
                    </Typography>
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#FF6A00', fontWeight: 800, fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: 1 }}>
                        Shs {(product.price / 1000).toFixed(1)}K
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: { xs: '0.6rem', md: '0.65rem' }, display: { xs: 'none', sm: 'block' } }}>
                        per unit
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'grey.100',
                        width: { xs: 28, md: 36 },
                        height: { xs: 28, md: 36 },
                        '&:hover': { bgcolor: 'grey.200' }
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary' }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#FF6A00',
              color: '#FF6A00',
              px: { xs: 4, md: 6 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
              fontWeight: 700,
              borderWidth: 2,
              fontSize: { xs: '0.875rem', md: '1rem' },
              '&:hover': {
                borderColor: '#E65F00',
                bgcolor: 'rgba(255, 106, 0, 0.05)',
                borderWidth: 2,
              },
            }}
          >
            Load More Products
          </Button>
        </Box>
      </Container>

      {/* Top Suppliers Section */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Top Suppliers
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trusted partners delivering quality materials
              </Typography>
            </Box>
            <Button endIcon={<ArrowForwardIcon />} sx={{ display: { xs: 'none', sm: 'flex' }, color: '#FF6A00', fontWeight: 700 }}>
              View All Suppliers
            </Button>
          </Stack>

          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'BuildPro Ltd', logo: 'BP', color: '#FF6A00', products: '1,234 Products', rating: 4.9 },
              { name: 'ConcreteKing', logo: 'CK', color: '#00695c', products: '987 Products', rating: 4.8 },
              { name: 'MegaBlocks', logo: 'MB', color: '#1976d2', products: '2,145 Products', rating: 4.7 },
              { name: 'PaverPro', logo: 'PP', color: '#d32f2f', products: '856 Products', rating: 4.9 },
              { name: 'EliteConstruct', logo: 'EC', color: '#7b1fa2', products: '1,567 Products', rating: 4.6 },
              { name: 'UrbanBlocks', logo: 'UB', color: '#f57c00', products: '1,023 Products', rating: 4.8 },
            ].map((supplier, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      '& .supplier-avatar': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 8px 24px ${alpha(supplier.color, 0.3)}`,
                      },
                    },
                  }}
                >
                  <Avatar
                    className="supplier-avatar"
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      mx: 'auto',
                      mb: 2,
                      bgcolor: supplier.color,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      fontWeight: 900,
                      transition: 'all 0.3s',
                      boxShadow: `0 4px 12px ${alpha(supplier.color, 0.2)}`,
                    }}
                  >
                    {supplier.logo}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {supplier.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {supplier.products}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                    <Rating value={supplier.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {supplier.rating}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Box>
  );
}
