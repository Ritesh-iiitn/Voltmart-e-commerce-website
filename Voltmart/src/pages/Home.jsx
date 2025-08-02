import * as React from 'react';
import { Typography, Grid, Box, Container, Button, CircularProgress, Alert, Paper, styled, Pagination } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import summerSaleImage from '../assets/images/photo1.webp';
import techGadgetsImage from '../assets/images/photo2.avif';
import trendingFashionImage from '../assets/images/photo4.webp';
import '../App.css';

const StyledCarousel = styled(Carousel)({
  '& .Carousel-indicators-container': {
    bottom: '30px',
    zIndex: 2,
    '& button': {
      backgroundColor: 'rgba(0, 212, 255, 0.8)',
      border: '2px solid transparent',
      borderRadius: '50%',
      width: '15px',
      height: '15px',
      margin: '0 8px',
      opacity: 0.6,
      transition: 'all 0.3s ease',
      '&:hover': { 
        opacity: 1,
        transform: 'scale(1.2)',
        backgroundColor: '#00d4ff',
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
      },
      '&.selected': { 
        opacity: 1,
        backgroundColor: '#00d4ff',
        border: '2px solid #ffffff',
        transform: 'scale(1.3)',
        boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
      },
    },
  },
  '& .CarouselItem': {
    position: 'relative',
    overflow: 'hidden',
  },
});

const HeroContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  borderRadius: '20px',
  overflow: 'hidden',
  marginBottom: '4rem',
  position: 'relative',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
  border: '1px solid rgba(0, 212, 255, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #00d4ff, #ff006e, #8338ec, transparent)',
    zIndex: 1,
  },
});

const SectionTitle = styled(Typography)({
  fontWeight: '900',
  fontSize: '3rem',
  background: 'linear-gradient(45deg, #00d4ff, #ff006e, #8338ec)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '1rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e)',
    borderRadius: '2px',
  },
});

const SectionSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  marginBottom: '3rem',
  fontSize: '1.2rem',
  fontWeight: '300',
});

const CyberButton = styled(Button)({
  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
  border: '2px solid #00d4ff',
  borderRadius: '0',
  clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)',
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: '700',
  padding: '15px 40px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)',
    background: 'linear-gradient(45deg, #ff006e, #8338ec)',
    border: '2px solid #ff006e',
    '&::before': {
      left: '100%',
    },
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem',
  '& .MuiCircularProgress-root': {
    color: '#00d4ff',
    marginBottom: '1rem',
  },
});

const RecommendationContainer = styled(Container)({
  background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
  borderRadius: '20px',
  border: '1px solid rgba(0, 212, 255, 0.2)',
  padding: '3rem 2rem',
  marginTop: '4rem',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
  },
});

const CTASection = styled(Box)({
  background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)',
  borderRadius: '20px',
  border: '2px solid rgba(0, 212, 255, 0.3)',
  padding: '4rem 2rem',
  textAlign: 'center',
  marginTop: '4rem',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '0',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.1), transparent 50%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: '0',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 70% 50%, rgba(255, 0, 110, 0.1), transparent 50%)',
    pointerEvents: 'none',
  },
});

const AnimatedGrid = styled(Grid)({
  '& > .MuiGrid-item': {
    animation: 'slideUpFade 0.6s ease-out forwards',
    opacity: 0,
    transform: 'translateY(30px)',
    '&:nth-of-type(1)': { animationDelay: '0.1s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.3s' },
    '&:nth-of-type(4)': { animationDelay: '0.4s' },
    '&:nth-of-type(5)': { animationDelay: '0.5s' },
    '&:nth-of-type(6)': { animationDelay: '0.6s' },
  },
  '@keyframes slideUpFade': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

const normalizeProduct = p => {
  const canonical = p._id || p.id;
  return { ...p, id: canonical, _id: canonical };
};

function Home({ products, addToCart, error, loading }) {
  const featuredProducts = products.slice(0, 3);
  const [animatedCards, setAnimatedCards] = React.useState([]);
  const [recs, setRecs] = React.useState([]);
  const [recLoading, setRecLoading] = React.useState(true);
  const [recError, setRecError] = React.useState(null);
  const [recPage, setRecPage] = React.useState(1);
  const recPerPage = 6;

  /* Featured card animation */
  React.useEffect(() => {
    const t = setTimeout(() => {
      setAnimatedCards(featuredProducts.map((_, i) => i));
    }, 100);
    return () => clearTimeout(t);
  }, [featuredProducts]);

  /* Fetch recommendations from last-10 visited unique IDs */
  React.useEffect(() => {
    async function fetchRecs() {
      try {
        const visited = JSON.parse(localStorage.getItem('visitedProducts')) || [];
        if (!visited.length) {
          setRecLoading(false);
          return;
        }

        const seen = new Set();
        const lastTen = [];
        for (let i = visited.length - 1; i >= 0 && lastTen.length < 10; i--) {
          const vid = visited[i].id;
          if (!seen.has(vid)) {
            seen.add(vid);
            lastTen.push(vid);
          }
        }
        if (!lastTen.length) {
          setRecLoading(false);
          return;
        }

        const { data } = await axios.post('https://fusion-electronics-api.vercel.app/api/products/recommendations', { ids: lastTen });
        setRecs(data || []);
      } catch (e) {
        setRecError(e);
      } finally {
        setRecLoading(false);
      }
    }
    fetchRecs();
  }, []);

  /* Pagination helpers for recommendations */
  const recPageCount = Math.ceil(recs.length / recPerPage);
  const recStart = (recPage - 1) * recPerPage;
  const recToShow = recs.slice(recStart, recStart + recPerPage);
  const handleRecPageChange = (_e, value) => setRecPage(value);

  /* Banner images */
  const bannerImages = [
    { url: summerSaleImage, title: 'Summer Sale - Up to 50% Off', description: 'Shop now for the best deals on summer essentials!' },
    { url: techGadgetsImage, title: 'New Tech Gadgets', description: 'Explore the latest in tech and gadgets.' },
    { url: trendingFashionImage, title: 'Trending Electronics', description: 'Discover the newest trends in electronics this season.' },
  ];

  return (
    <Box sx={{ 
      my: 4, 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)',
      minHeight: '100vh',
      padding: '2rem 0',
    }}>
      {/* ───────── Hero Section ───────── */}
      <Container maxWidth="lg">
        <HeroContainer>
          <StyledCarousel
            animation="slide"
            autoPlay
            interval={4000}
            navButtonsAlwaysVisible
            navButtonsProps={{
              style: { 
                backgroundColor: 'rgba(0, 212, 255, 0.8)', 
                color: '#fff', 
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                width: '50px',
                height: '50px',
                transition: 'all 0.3s ease',
              },
            }}
            navButtonsWrapperProps={{
              style: {
                '&:hover': {
                  backgroundColor: '#00d4ff',
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
                }
              }
            }}
          >
            {bannerImages.map((item, i) => (
              <Box key={i} sx={{ position: 'relative', height: '500px' }}>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(0.7) contrast(1.2)',
                  }} 
                />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  color: '#fff', 
                  p: 4,
                  zIndex: 1,
                }}>
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontWeight: 900,
                      marginBottom: 2,
                      background: 'linear-gradient(45deg, #00d4ff, #ffffff)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </StyledCarousel>
        </HeroContainer>
      </Container>

      {/* ───────── Featured Products ───────── */}
      <Container maxWidth="lg">
        <SectionTitle variant="h2">
          Featured Products
        </SectionTitle>
        <SectionSubtitle variant="h6">
          Check out our top picks for this month!
        </SectionSubtitle>

        {error ? (
          <Alert 
            severity="error" 
            sx={{ 
              backgroundColor: 'rgba(255, 0, 110, 0.1)',
              border: '1px solid rgba(255, 0, 110, 0.3)',
              color: '#ff006e',
              borderRadius: '10px',
            }}
          >
            {error.message}
          </Alert>
        ) : loading ? (
          <LoadingContainer>
            <CircularProgress size={60} thickness={4} />
            <Typography sx={{ color: '#00d4ff', mt: 2, fontSize: '1.2rem' }}>
              Loading amazing products...
            </Typography>
          </LoadingContainer>
        ) : (
          <AnimatedGrid container spacing={4}>
            {featuredProducts.map((p, idx) => (
              <Grid 
                item 
                key={p._id} 
                xs={12} 
                sm={6} 
                md={4} 
                className={animatedCards.includes(idx) ? 'product-card-animated' : ''}
              >
                <ProductCard product={normalizeProduct(p)} addToCart={addToCart} />
              </Grid>
            ))}
          </AnimatedGrid>
        )}
      </Container>

      {/* ───────── Recommended Section ───────── */}
      <RecommendationContainer maxWidth="lg">
        <SectionTitle variant="h2">
          Recommended For You
        </SectionTitle>
        <SectionSubtitle variant="h6">
          Based on your recent views, we think you might like these products!
        </SectionSubtitle>

        {recError ? (
          <Alert 
            severity="error"
            sx={{ 
              backgroundColor: 'rgba(255, 0, 110, 0.1)',
              border: '1px solid rgba(255, 0, 110, 0.3)',
              color: '#ff006e',
              borderRadius: '10px',
            }}
          >
            {recError.message}
          </Alert>
        ) : recLoading ? (
          <LoadingContainer>
            <CircularProgress size={60} thickness={4} />
            <Typography sx={{ color: '#00d4ff', mt: 2, fontSize: '1.2rem' }}>
              Finding perfect recommendations...
            </Typography>
          </LoadingContainer>
        ) : recs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 300,
                fontSize: '1.3rem',
              }}
            >
              Browse a few products so we can analyze your preferences and recommend relevant items!
            </Typography>
          </Box>
        ) : (
          <>
            <AnimatedGrid container spacing={4}>
              {recToShow.map(rec => (
                <Grid item key={rec.id} xs={12} sm={6} md={4}>
                  <ProductCard product={normalizeProduct(rec)} addToCart={addToCart} />
                </Grid>
              ))}
            </AnimatedGrid>

            {recPageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={recPageCount} 
                  page={recPage} 
                  onChange={handleRecPageChange} 
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#00d4ff',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid #00d4ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#00d4ff',
                        color: '#000000',
                        fontWeight: 'bold',
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </RecommendationContainer>

      {/* ───────── Call to Action ───────── */}
      <Container maxWidth="lg">
        <CTASection>
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 900,
              marginBottom: 3,
              background: 'linear-gradient(45deg, #00d4ff, #ff006e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Explore More?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              marginBottom: 4,
              fontWeight: 300,
            }}
          >
            Discover thousands of amazing products waiting for you
          </Typography>
          <CyberButton variant="contained" size="large" href="/shop">
            View More Products
          </CyberButton>
        </CTASection>
      </Container>
    </Box>
  );
}

export default Home;