'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

interface NewsletterPopupProps {
  delay?: number;
  customerType?: 'customer' | 'supplier';
}

export default function NewsletterPopup({ delay = 3000, customerType = 'customer' }: NewsletterPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [noThanks, setNoThanks] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup
    const dismissed = localStorage.getItem('newsletter_dismissed');
    const subscribed = localStorage.getItem('newsletter_subscribed');
    
    if (!dismissed && !subscribed) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  const handleClose = () => {
    setOpen(false);
    if (noThanks) {
      localStorage.setItem('newsletter_dismissed', 'true');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store subscription
      localStorage.setItem('newsletter_subscribed', 'true');
      localStorage.setItem('newsletter_email', email);
      console.log('Newsletter subscription:', email);
      setOpen(false);
    }
  };

  const brandName = customerType === 'supplier' ? 'ConcreteHub Suppliers' : 'ConcreteHub';
  const discount = customerType === 'supplier' ? '20% OFF' : '30% OFF';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 2,
          color: 'text.primary',
          bgcolor: 'white',
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Side - Image */}
        <Box
          sx={{
            flex: '0 0 45%',
            background: 'linear-gradient(135deg, rgba(255,106,0,0.9) 0%, rgba(255,133,52,0.9) 100%)',
            position: 'relative',
            minHeight: { xs: 250, md: 500 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500"
            alt="Newsletter"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,106,0,0.7) 0%, rgba(255,133,52,0.7) 100%)',
            }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: '#FF6A00',
              fontWeight: 700,
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            UP TO {discount}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Sign up to {brandName}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Subscribe to the {customerType === 'supplier' ? 'Supplier' : 'BAZAR eCommerce'} newsletter to receive timely
            updates from your favorite products.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#1a1a2e',
                color: 'white',
                py: 1.5,
                borderRadius: 2,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: '1rem',
                mb: 3,
                '&:hover': {
                  bgcolor: '#0f0f1a',
                },
              }}
            >
              Submit
            </Button>

            {/* Social Icons */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <IconButton
                sx={{
                  color: '#1877F2',
                  '&:hover': { bgcolor: 'rgba(24, 119, 242, 0.1)' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#1DA1F2',
                  '&:hover': { bgcolor: 'rgba(29, 161, 242, 0.1)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#E4405F',
                  '&:hover': { bgcolor: 'rgba(228, 64, 95, 0.1)' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#DB4437',
                  '&:hover': { bgcolor: 'rgba(219, 68, 55, 0.1)' },
                }}
              >
                <GoogleIcon />
              </IconButton>
            </Stack>

            <FormControlLabel
              control={
                <Checkbox
                  checked={noThanks}
                  onChange={(e) => setNoThanks(e.target.checked)}
                  sx={{
                    color: 'text.secondary',
                    '&.Mui-checked': { color: '#FF6A00' },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No, Thanks
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
