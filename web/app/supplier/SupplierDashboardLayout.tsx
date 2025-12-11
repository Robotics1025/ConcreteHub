'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Badge,
  Menu,
  MenuItem,
  alpha,
  Collapse,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import HelpIcon from '@mui/icons-material/Help';
import ConstructionIcon from '@mui/icons-material/Construction';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

const MENU_ITEMS = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/supplier/dashboard',
  },
  {
    title: 'Orders',
    icon: <ShoppingBagIcon />,
    path: '/supplier/orders',
    badge: 5,
  },
  {
    title: 'Products',
    icon: <InventoryIcon />,
    submenu: [
      { title: 'All Products', icon: <ListAltIcon />, path: '/supplier/products' },
      { title: 'Add Product', icon: <AddIcon />, path: '/supplier/products/add' },
      { title: 'Categories', icon: <CategoryIcon />, path: '/supplier/categories' },
    ],
  },
  {
    title: 'Customers',
    icon: <PeopleIcon />,
    path: '/supplier/customers',
  },
  {
    title: 'Analytics',
    icon: <BarChartIcon />,
    path: '/supplier/analytics',
  },
  {
    title: 'Finance',
    icon: <AttachMoneyIcon />,
    submenu: [
      { title: 'Earnings', path: '/supplier/finance/earnings' },
      { title: 'Transactions', path: '/supplier/finance/transactions' },
      { title: 'Payouts', path: '/supplier/finance/payouts' },
    ],
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
    path: '/supplier/messages',
    badge: 3,
  },
];

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [userName, setUserName] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if user is authenticated as supplier
    const isAuth = localStorage.getItem('isAuthenticated');
    const userType = localStorage.getItem('userType');

    if (!isAuth || userType !== 'supplier') {
      router.push('/supplier/signin');
      return;
    }

    setBusinessName(localStorage.getItem('businessName') || 'Supplier Business');
    setUserName(localStorage.getItem('userName') || 'Supplier');

    // Keyboard shortcut for search
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('businessName');
    localStorage.removeItem('businessType');
    router.push('/');
  };

  const handleSubmenuToggle = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(145, 158, 171, 0.08)', transition: 'width 0.3s ease', position: 'relative' }}>
      {/* Logo */}
      <Box sx={{ p: sidebarCollapsed ? 2 : 3, display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #FF6A00 0%, #E65F00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ConstructionIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        {!sidebarCollapsed && (
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#212B36' }}>
            ConcreteHub
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Chevron Toggle Button */}
      <IconButton
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        sx={{
          position: 'absolute',
          right: -12,
          top: 20,
          width: 24,
          height: 24,
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'rgba(145, 158, 171, 0.24)',
          boxShadow: '0 2px 8px rgba(145, 158, 171, 0.16)',
          '&:hover': {
            bgcolor: '#F9FAFB',
            borderColor: 'rgba(145, 158, 171, 0.32)',
          },
          zIndex: 1,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        {sidebarCollapsed ? (
          <ExpandMore sx={{ transform: 'rotate(-90deg)', fontSize: 16, color: '#637381' }} />
        ) : (
          <ExpandLess sx={{ transform: 'rotate(90deg)', fontSize: 16, color: '#637381' }} />
        )}
      </IconButton>

      <Divider />

      {/* Business Info - Only show avatar when collapsed */}
      {sidebarCollapsed && (
        <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#FF6A00',
              fontWeight: 700,
            }}
          >
            {businessName.charAt(0)}
          </Avatar>
        </Box>
      )}

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, overflowY: 'auto' }}>
        {MENU_ITEMS.map((item) => (
          <Box key={item.title}>
            {item.submenu && !sidebarCollapsed ? (
              <>
                <ListItemButton
                  onClick={() => handleSubmenuToggle(item.title)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 0.5,
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    '&:hover': {
                      bgcolor: alpha('#FF6A00', 0.08),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 0 : 40, color: '#637381', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  {!sidebarCollapsed && (
                    <>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#212B36',
                        }}
                      />
                      {openSubmenu === item.title ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>
                <Collapse in={openSubmenu === item.title && !sidebarCollapsed} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subitem) => (
                      <ListItemButton
                        key={subitem.title}
                        onClick={() => router.push(subitem.path)}
                        selected={pathname === subitem.path}
                        sx={{
                          pl: 7,
                          borderRadius: 1.5,
                          mb: 0.5,
                          '&.Mui-selected': {
                            bgcolor: alpha('#FF6A00', 0.12),
                            '&:hover': {
                              bgcolor: alpha('#FF6A00', 0.16),
                            },
                          },
                          '&:hover': {
                            bgcolor: alpha('#FF6A00', 0.08),
                          },
                        }}
                      >
                        {subitem.icon && (
                          <ListItemIcon sx={{ minWidth: 32, color: '#637381' }}>
                            {subitem.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={subitem.title}
                          primaryTypographyProps={{
                            fontSize: '0.813rem',
                            fontWeight: pathname === subitem.path ? 600 : 500,
                            color: pathname === subitem.path ? '#FF6A00' : '#637381',
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                onClick={() => item.submenu && sidebarCollapsed ? null : router.push(item.path || item.submenu?.[0]?.path || '/')}
                selected={pathname === item.path}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  '&.Mui-selected': {
                    bgcolor: alpha('#FF6A00', 0.12),
                    color: '#FF6A00',
                    '& .MuiListItemIcon-root': {
                      color: '#FF6A00',
                    },
                    '&:hover': {
                      bgcolor: alpha('#FF6A00', 0.16),
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha('#FF6A00', 0.08),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: sidebarCollapsed ? 0 : 40,
                    color: pathname === item.path ? '#FF6A00' : '#637381',
                    justifyContent: 'center',
                  }}
                >
                  {item.badge && !sidebarCollapsed ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: pathname === item.path ? 700 : 600,
                      color: pathname === item.path ? '#FF6A00' : '#212B36',
                    }}
                  />
                )}
              </ListItemButton>
            )}
          </Box>
        ))}
      </List>

      <Divider />

      {/* Bottom Menu */}
      <List sx={{ px: 2, py: 1 }}>
        <ListItemButton
          onClick={() => router.push('/supplier/settings')}
          sx={{
            borderRadius: 1.5,
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            '&:hover': {
              bgcolor: alpha('#FF6A00', 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 0 : 40, color: '#637381', justifyContent: 'center' }}>
            <SettingsIcon />
          </ListItemIcon>
          {!sidebarCollapsed && (
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#212B36',
              }}
            />
          )}
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push('/supplier/help')}
          sx={{
            borderRadius: 1.5,
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            '&:hover': {
              bgcolor: alpha('#FF6A00', 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 0 : 40, color: '#637381', justifyContent: 'center' }}>
            <HelpIcon />
          </ListItemIcon>
          {!sidebarCollapsed && (
            <ListItemText
              primary="Help & Support"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#212B36',
              }}
            />
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH}px)` },
          ml: { md: `${sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(145, 158, 171, 0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {/* Mobile menu toggle */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: '#212B36' }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search bar with ⌘K shortcut indicator */}
          <TextField
            onClick={() => setSearchOpen(true)}
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              minWidth: 240,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(145, 158, 171, 0.12)',
                boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                '&:hover': {
                  bgcolor: '#F9FAFB',
                  borderColor: 'rgba(145, 158, 171, 0.24)',
                },
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#637381', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                      bgcolor: '#F4F6F8',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: '1px solid rgba(145, 158, 171, 0.12)',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 12, fontWeight: 700, color: '#637381' }}>
                      ⌘K
                    </Typography>
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Language Icon */}
          <IconButton
            sx={{
              width: 44,
              height: 44,
              color: '#637381',
              '&:hover': {
                bgcolor: alpha('#919EAB', 0.08),
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
              ml: 0.5,
            }}
          >
            <LanguageIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* Notifications */}
          <IconButton
            onClick={handleNotifMenuOpen}
            sx={{
              width: 44,
              height: 44,
              position: 'relative',
              color: '#637381',
              '&:hover': {
                bgcolor: alpha('#919EAB', 0.08),
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
              ml: 0.5,
            }}
          >
            <NotificationsIcon sx={{ fontSize: 22 }} />
            {/* Badge indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 18,
                height: 18,
                borderRadius: '50%',
                bgcolor: '#FF5252',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
              }}
            >
              4
            </Box>
          </IconButton>

          {/* Group/Team Icon */}
          <IconButton
            sx={{
              width: 44,
              height: 44,
              color: '#637381',
              '&:hover': {
                bgcolor: alpha('#919EAB', 0.08),
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
              ml: 0.5,
            }}
          >
            <GroupIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* Settings with continuous rotation */}
          <IconButton
            onClick={() => router.push('/supplier/settings')}
            sx={{
              width: 44,
              height: 44,
              color: '#637381',
              '&:hover': {
                bgcolor: alpha('#919EAB', 0.08),
              },
              transition: 'background-color 0.2s ease-in-out',
              ml: 0.5,
              '& svg': {
                animation: 'rotate 3s linear infinite',
              },
              '@keyframes rotate': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* Profile */}
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              ml: 1,
              '&:hover': {
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Avatar
              sx={{
                width: 44,
                height: 44,
                bgcolor: '#FF6A00',
                fontSize: '0.875rem',
              }}
            >
              {userName.charAt(0)}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
              borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
              transition: 'width 0.3s ease',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH}px)` },
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), 0 16px 32px -4px rgba(145, 158, 171, 0.24)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {businessName}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => router.push('/supplier/profile')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => router.push('/supplier/settings')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 400,
            borderRadius: 2,
            boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), 0 16px 32px -4px rgba(145, 158, 171, 0.24)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            You have 4 unread messages
          </Typography>
        </Box>
        <Divider />
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: alpha('#00B8D9', 0.16), color: '#00B8D9' }}>
              <ShoppingBagIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              New order received
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2 minutes ago
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: alpha('#FFB400', 0.16), color: '#FFB400' }}>
              <MessageIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              New customer message
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1 hour ago
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5, textAlign: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: '#FF6A00', fontWeight: 600 }}>
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 20px 40px -4px rgba(145, 158, 171, 0.24)',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <TextField
              autoFocus
              fullWidth
              placeholder="Search..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#637381' }} />
                  </InputAdornment>
                ),
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  bgcolor: '#F4F6F8',
                  borderRadius: 1.5,
                },
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block', fontWeight: 600 }}>
              Recent Searches
            </Typography>
            <Stack spacing={1}>
              {['Products', 'Orders', 'Customers', 'Analytics'].map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setSearchOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: '#212B36',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: alpha('#919EAB', 0.08),
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}