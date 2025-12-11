'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
  Tab,
  Tabs,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export default function AuthModal({ open, onClose, onAuthSuccess }: AuthModalProps) {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'supplier' | 'admin'>('customer');
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
    
    // Store authentication data based on user type
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.name || formData.email.split('@')[0]);
    localStorage.setItem('userType', userType);
    
    if (userType === 'supplier') {
      localStorage.setItem('businessName', formData.businessName || 'Supplier Business');
      localStorage.setItem('businessType', formData.businessType || 'General');
    }
    
    if (userType === 'admin') {
      localStorage.setItem('isAdmin', 'true');
    }
    
    onAuthSuccess();
    onClose();
    
    // Redirect based on user type
    if (userType === 'supplier') {
      window.location.href = '/supplier/dashboard';
    } else if (userType === 'admin') {
      window.location.href = '/admin/support';
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', `User via ${provider}`);
    localStorage.setItem('userType', userType);
    
    if (userType === 'supplier') {
      window.location.href = '/supplier/dashboard';
    } else if (userType === 'admin') {
      window.location.href = '/admin/support';
    }
    
    onAuthSuccess();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: 480,
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', pt: 4, px: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: '#FF6A00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
            }}
          >
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 900 }}>
              C
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            Welcome to ConcreteHub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue shopping
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ px: 4 }}>
          {/* User Type Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              I am a:
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant={userType === 'customer' ? 'contained' : 'outlined'}
                onClick={() => setUserType('customer')}
                startIcon={<PersonIcon />}
                sx={{
                  bgcolor: userType === 'customer' ? '#FF6A00' : 'transparent',
                  borderColor: '#FF6A00',
                  color: userType === 'customer' ? 'white' : '#FF6A00',
                  '&:hover': {
                    bgcolor: userType === 'customer' ? '#E65F00' : 'rgba(255, 106, 0, 0.08)',
                  },
                }}
              >
                Customer
              </Button>
              <Button
                fullWidth
                variant={userType === 'supplier' ? 'contained' : 'outlined'}
                onClick={() => setUserType('supplier')}
                startIcon={<BusinessIcon />}
                sx={{
                  bgcolor: userType === 'supplier' ? '#FF6A00' : 'transparent',
                  borderColor: '#FF6A00',
                  color: userType === 'supplier' ? 'white' : '#FF6A00',
                  '&:hover': {
                    bgcolor: userType === 'supplier' ? '#E65F00' : 'rgba(255, 106, 0, 0.08)',
                  },
                }}
              >
                Supplier
              </Button>
              <Button
                fullWidth
                variant={userType === 'admin' ? 'contained' : 'outlined'}
                onClick={() => setUserType('admin')}
                startIcon={<AdminPanelSettingsIcon />}
                sx={{
                  bgcolor: userType === 'admin' ? '#FF6A00' : 'transparent',
                  borderColor: '#FF6A00',
                  color: userType === 'admin' ? 'white' : '#FF6A00',
                  '&:hover': {
                    bgcolor: userType === 'admin' ? '#E65F00' : 'rgba(255, 106, 0, 0.08)',
                  },
                }}
              >
                Admin
              </Button>
            </Stack>
          </Box>

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                flex: 1,
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
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Sign In Form */}
          {tabValue === 0 && (
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Email"
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
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
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
                        size="small"
                        sx={{
                          color: '#FF6A00',
                          '&.Mui-checked': { color: '#FF6A00' },
                        }}
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  <Button
                    variant="text"
                    sx={{
                      color: '#FF6A00',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    Forgot Password?
                  </Button>
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
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#E65F00',
                      boxShadow: 2,
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          )}

          {/* Sign Up Form */}
          {tabValue === 1 && (
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
                  label="Email"
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
                
                {/* Supplier-specific fields */}
                {userType === 'supplier' && (
                  <>
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
                  </>
                )}
                
                {/* Admin-specific note */}
                {userType === 'admin' && (
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'warning.lighter', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'warning.main',
                  }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
                      Admin registration requires approval from existing administrators.
                    </Typography>
                  </Box>
                )}
                
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
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
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
                      size="small"
                      sx={{
                        color: '#FF6A00',
                        '&.Mui-checked': { color: '#FF6A00' },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the Terms & Conditions
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
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#E65F00',
                      boxShadow: 2,
                    },
                  }}
                >
                  {userType === 'customer' ? 'Create Account' : 
                   userType === 'supplier' ? 'Register as Supplier' : 
                   'Register as Admin'}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Social Login - Only for customers */}
          {userType === 'customer' && (
            <Stack spacing={2} sx={{ pb: 4 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('Google')}
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  fontWeight: 600,
                  py: 1.2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#FF6A00',
                    bgcolor: 'rgba(255, 106, 0, 0.05)',
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin('Facebook')}
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  fontWeight: 600,
                  py: 1.2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#FF6A00',
                    bgcolor: 'rgba(255, 106, 0, 0.05)',
                  },
                }}
              >
                Continue with Facebook
              </Button>
            </Stack>
          )}
          
          {/* Info message for suppliers/admins */}
          {(userType === 'supplier' || userType === 'admin') && tabValue === 0 && (
            <Box sx={{ pb: 4 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
                {userType === 'supplier' 
                  ? '🏢 Supplier accounts get access to dashboard, inventory management, and order tracking.'
                  : '🔐 Admin access required for platform management and support tools.'}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
