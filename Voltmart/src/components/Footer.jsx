import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        // Using a slightly darker, more muted primary color for a sophisticated look
        backgroundColor: '#2c3e50', // A deep charcoal grey/blue
        color: '#ecf0f1', // Light, soft grey for text to ensure readability
        padding: '3rem 0', // Increased vertical padding for more breathing room
        marginTop: '3rem', // More space above the footer
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.2)', // Softer, more pronounced shadow
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}> {/* Increased spacing between grid items */}
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '1.2rem', color: '#3498db' }}> {/* Slightly larger, bolder heading with a vibrant accent color */}
              About Us
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}> {/* Slightly larger body text and improved line height */}
              Discover our platform for cutting-edge products, unbeatable deals, and a seamless, intuitive shopping experience. Your satisfaction is at the heart of everything we do.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '1.2rem', color: '#3498db' }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.7rem', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#e74c3c' } }}> {/* Enhanced hover effect and transition */}
                Home
              </Link>
              <Link href="/shop" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.7rem', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#e74c3c' } }}>
                Shop
              </Link>
              <Link href="/cart" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.7rem', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#e74c3c' } }}>
                Cart
              </Link>
              <Link href="/login" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.7rem', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#e74c3c' } }}>
                Login
              </Link>
              <Link href="/register" color="inherit" underline="hover" sx={{ display: 'block', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#e74c3c' } }}>
                Register
              </Link>
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '1.2rem', color: '#3498db' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              Project Maintainer:{' '}
              <Link href="https://github.com/hoangsonww" color="inherit" sx={{ textDecoration: 'underline', '&:hover': { color: '#e74c3c' } }}>
                Son Nguyen
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              Email:{' '}
              <Link href="mailto:hoangson091104@gmail.com" color="inherit" sx={{ textDecoration: 'underline', '&:hover': { color: '#e74c3c' } }}>
                hoangson091104@gmail.com
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>Phone: +1 (123) 456-7890</Typography>
            <Typography variant="body1" sx={{ marginTop: '0.8rem' }}>
              Address: 123 Product St, Suite 500, Los Angeles, CA 90001
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Lighter, more subtle border
            marginTop: '3rem', // More space above the copyright
            paddingTop: '1.5rem', // More padding below the border
          }}
        >
          <Typography variant="body2" sx={{ color: '#bdc3c7' }}> {/* Slightly muted copyright text */}
            © {new Date().getFullYear()} Voltmarts. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;