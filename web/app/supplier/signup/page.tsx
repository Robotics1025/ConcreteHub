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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function SupplierSignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store authentication data
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userType', 'supplier');
    localStorage.setItem('businessName', formData.businessName);
    localStorage.setItem('businessType', formData.businessType);
    
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
        py: 4,
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
              Supplier Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join ConcreteHub as a verified supplier
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

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
                label="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254 712 345 678"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Business Name"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth required>
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={formData.businessType}
                  label="Business Type"
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                >
                  <MenuItem value="Cement Supplier">Cement Supplier</MenuItem>
                  <MenuItem value="Steel & Iron">Steel & Iron</MenuItem>
                  <MenuItem value="Building Materials">Building Materials</MenuItem>
                  <MenuItem value="Tools & Equipment">Tools & Equipment</MenuItem>
                  <MenuItem value="Hardware">Hardware</MenuItem>
                  <MenuItem value="General Construction">General Construction</MenuItem>
                </Select>
              </FormControl>

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

              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    required
                    sx={{
                      color: '#FF6A00',
                      '&.Mui-checked': { color: '#FF6A00' },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the Terms & Conditions for Suppliers
                  </Typography>
                }
              />

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
                Create Supplier Account
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have a supplier account?{' '}
                  <MuiLink
                    component={Link}
                    href="/supplier/signin"
                    sx={{
                      color: '#FF6A00',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Sign In
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
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
