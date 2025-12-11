'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConstructionIcon from '@mui/icons-material/Construction';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import AuthModal from './AuthModal';

export default function Header() {
  const router = useRouter();
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedName = localStorage.getItem('userName') || '';
    setIsAuthenticated(authStatus);
    setUserName(storedName);
  }, []);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      setAccountAnchor(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAccountAnchor(null);
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      router.push('/orders');
    }
  };

  const handleAuthSuccess = () => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedName = localStorage.getItem('userName') || '';
    setIsAuthenticated(authStatus);
    setUserName(storedName);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    handleClose();
    router.push('/');
  };
  return (
    <>
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

      {/* Main Header */}
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
            {/* Logo */}
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

            {/* Search Bar */}
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

            {/* Right Actions */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<PersonIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleAccountClick}
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                {isAuthenticated ? userName : 'Account'}
              </Button>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={handleClose}
              >
                <MenuItem component={Link} href="/profile" onClick={handleClose}>
                  My Profile
                </MenuItem>
                <MenuItem component={Link} href="/orders" onClick={handleClose}>
                  Orders
                </MenuItem>
                <MenuItem onClick={handleClose}>Wishlist</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LogoutIcon fontSize="small" />
                    <span>Logout</span>
                  </Stack>
                </MenuItem>
              </Menu>

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

              <IconButton onClick={handleCartClick} sx={{ color: 'text.primary' }}>
                <Badge badgeContent={isAuthenticated ? 5 : 0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
