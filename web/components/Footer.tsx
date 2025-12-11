'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 'auto' }}>
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
  );
}
