'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function SupplierSignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.email.split('@')[0]);
    localStorage.setItem('userType', 'supplier');
    localStorage.setItem('businessName', 'Demo Supplier Business');
    localStorage.setItem('businessType', 'General Construction');
    
    // Redirect to supplier dashboard
    router.push('/supplier/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2,
              }}
            >
              <ConstructionIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Supplier Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access your supplier dashboard
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: '#FF6A00',
                        '&.Mui-checked': { color: '#FF6A00' },
                      }}
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <MuiLink
                  href="#"
                  sx={{
                    color: '#FF6A00',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Forgot Password?
                </MuiLink>
              </Stack>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: '#FF6A00',
                  color: 'white',
                  fontWeight: 700,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#E65F00',
                  },
                }}
              >
                Sign In to Dashboard
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have a supplier account?{' '}
                  <MuiLink
                    component={Link}
                    href="/supplier/signup"
                    sx={{
                      color: '#FF6A00',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Sign Up Now
                  </MuiLink>
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Are you a customer?{' '}
                  <MuiLink
                    component={Link}
                    href="/"
                    sx={{
                      color: '#FF6A00',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Go to Customer Site
                  </MuiLink>
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  bgcolor: '#FFF3E0',
                  borderRadius: 2,
                  border: '1px solid #FFB400',
                }}
              >
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
                  🏢 Supplier Benefits:
                </Typography>
                <Typography variant="caption" component="ul" sx={{ pl: 2, m: 0 }}>
                  <li>Access to supplier dashboard</li>
                  <li>Manage inventory & orders</li>
                  <li>Track sales & analytics</li>
                  <li>Direct customer messaging</li>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
