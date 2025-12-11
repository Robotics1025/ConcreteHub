'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Snackbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';

export default function ProfilePage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });
  const [profile, setProfile] = useState({
    name: 'John Kamau',
    email: 'john.kamau@example.com',
    phone: '+254 712 345 678',
    city: 'Nairobi',
    address: 'Westlands, Nairobi',
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'Image size should be less than 5MB',
          severity: 'error',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setSnackbar({
          open: true,
          message: 'Profile picture updated successfully!',
          severity: 'success',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #FF6A00 0%, #ff8534 100%)',
            color: 'white',
            p: 4,
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profileImage || undefined}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'white',
                  color: '#FF6A00',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  border: '4px solid rgba(255,255,255,0.3)',
                }}
              >
                {!profileImage && profile.name.charAt(0)}
              </Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-image-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    bgcolor: 'white',
                    color: '#FF6A00',
                    width: 36,
                    height: 36,
                    border: '2px solid #FF6A00',
                    '&:hover': {
                      bgcolor: '#FF6A00',
                      color: 'white',
                    },
                  }}
                >
                  <CameraAltIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </label>
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {profile.name}
                </Typography>
                <VerifiedIcon sx={{ color: '#4caf50' }} />
              </Stack>
              <Typography variant="body1" sx={{ opacity: 0.95, mb: 2 }}>
                {profile.email}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Chip
                  icon={<ShoppingBagIcon />}
                  label="24 Orders"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Chip
                  icon={<LocalShippingIcon />}
                  label="Premium Member"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Tabs Section */}
        <Paper elevation={0} sx={{ borderRadius: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 3,
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                minHeight: 64,
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
            <Tab icon={<PersonIcon />} iconPosition="start" label="Personal Info" />
            <Tab icon={<LockIcon />} iconPosition="start" label="Security" />
            <Tab icon={<SettingsIcon />} iconPosition="start" label="Preferences" />
          </Tabs>

          <Box sx={{ p: 4 }}>
            {/* Personal Info Tab */}
            {tabValue === 0 && (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Personal Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Update your account details
                    </Typography>
                  </Box>
                  {!isEditing ? (
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                      sx={{
                        bgcolor: '#FF6A00',
                        color: 'white',
                        fontWeight: 600,
                        px: 2,
                        '&:hover': { bgcolor: '#E65F00' },
                      }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                        sx={{ borderColor: 'grey.400' }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{
                          bgcolor: '#4caf50',
                          color: 'white',
                          '&:hover': { bgcolor: '#45a049' },
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FF6A00',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF6A00',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FF6A00',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF6A00',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FF6A00',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF6A00',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <LocationCityIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FF6A00',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF6A00',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FF6A00',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF6A00',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Security Tab */}
            {tabValue === 1 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Security Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your password and security
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Current Password"
                    placeholder="Enter current password"
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                      endAdornment: (
                        <Box
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Box>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6A00',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FF6A00',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    placeholder="Enter new password"
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6A00',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FF6A00',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 1.5, color: '#FF6A00' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6A00',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FF6A00',
                      },
                    }}
                  />
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#FF6A00',
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        '&:hover': { bgcolor: '#E65F00' },
                      }}
                    >
                      Update Password
                    </Button>
                  </Box>
                  <Alert severity="info">
                    Password must be at least 8 characters with letters and numbers
                  </Alert>
                </Stack>
              </Box>
            )}

            {/* Preferences Tab */}
            {tabValue === 2 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Notification Preferences
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose how you want to receive updates
                  </Typography>
                </Box>

                <List>
                  <ListItem
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      mb: 1.5,
                    }}
                  >
                    <ListItemIcon>
                      <NotificationsActiveIcon sx={{ color: '#FF6A00' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Order Updates"
                      secondary="Get notified about your order status and delivery"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.orderUpdates}
                          onChange={(e) =>
                            setNotifications({ ...notifications, orderUpdates: e.target.checked })
                          }
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF6A00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              bgcolor: '#FF6A00',
                            },
                          }}
                        />
                      }
                      label=""
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      mb: 1.5,
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#FF6A00' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Promotions & Offers"
                      secondary="Receive exclusive deals and special offers"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.promotions}
                          onChange={(e) =>
                            setNotifications({ ...notifications, promotions: e.target.checked })
                          }
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF6A00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              bgcolor: '#FF6A00',
                            },
                          }}
                        />
                      }
                      label=""
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <EmailIcon sx={{ color: '#FF6A00' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Newsletter"
                      secondary="Weekly newsletter with industry updates"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.newsletter}
                          onChange={(e) =>
                            setNotifications({ ...notifications, newsletter: e.target.checked })
                          }
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF6A00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              bgcolor: '#FF6A00',
                            },
                          }}
                        />
                      }
                      label=""
                    />
                  </ListItem>
                </List>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
