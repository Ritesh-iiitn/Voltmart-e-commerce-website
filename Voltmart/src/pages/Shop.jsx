import * as React from 'react';
import { Grid, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem, Pagination, CircularProgress, styled, Chip } from '@mui/material';
import { FilterList, GridView, ViewList } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import '../App.css';

const ShopContainer = styled(Container)({
  background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)',
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
  },
});

const HeaderSection = styled(Box)({
  background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.7))',
  borderRadius: '20px',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  padding: '3rem 2rem',
  marginBottom: '3rem',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e, #8338ec, #00d4ff)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '20%',
    right: '-10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
});

const ShopTitle = styled(Typography)({
  fontWeight: '900',
  fontSize: '3.5rem',
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
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '4px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e)',
    borderRadius: '2px',
  },
});

const ShopSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  fontSize: '1.3rem',
  fontWeight: '300',
  marginBottom: '2rem',
});

const FilterSection = styled(Box)({
  background: 'rgba(15, 15, 35, 0.8)',
  borderRadius: '15px',
  border: '1px solid rgba(0, 212, 255, 0.2)',
  padding: '2rem',
  marginBottom: '3rem',
  backdropFilter: 'blur(15px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '1rem',
});

const CyberSelect = styled(Select)({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '25px',
    color: '#ffffff',
    minWidth: '250px',
    transition: 'all 0.3s ease',
    '&:hover': {
      border: '1px solid rgba(0, 212, 255, 0.6)',
      background: 'rgba(0, 212, 255, 0.15)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
    },
    '&.Mui-focused': {
      border: '1px solid #00d4ff',
      background: 'rgba(0, 212, 255, 0.2)',
      boxShadow: '0 0 25px rgba(0, 212, 255, 0.3)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#00d4ff',
    },
  },
  '& .MuiSelect-icon': {
    color: '#00d4ff',
  },
});

const CyberFormControl = styled(FormControl)({
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.1rem',
    fontWeight: '500',
    '&.Mui-focused': {
      color: '#00d4ff',
    },
  },
});

const ResultsInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.1rem',
  fontWeight: '500',
});

const CategoryChip = styled(Chip)({
  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
  color: '#ffffff',
  fontWeight: '600',
  fontSize: '0.9rem',
  padding: '0.5rem',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff006e, #8338ec)',
    transform: 'scale(1.05)',
  },
});

const ProductGrid = styled(Grid)({
  '& > .MuiGrid-item': {
    animation: 'cyberpunkSlide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    opacity: 0,
    transform: 'translateY(50px) scale(0.9)',
    '&:nth-of-type(1)': { animationDelay: '0.1s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.3s' },
    '&:nth-of-type(4)': { animationDelay: '0.4s' },
    '&:nth-of-type(5)': { animationDelay: '0.5s' },
    '&:nth-of-type(6)': { animationDelay: '0.6s' },
  },
  '@keyframes cyberpunkSlide': {
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
});

const LoadingOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 15, 35, 0.95))',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  '& .MuiCircularProgress-root': {
    color: '#00d4ff',
    marginBottom: '2rem',
  },
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '4rem',
  marginBottom: '2rem',
  '& .MuiPagination-root': {
    background: 'rgba(15, 15, 35, 0.8)',
    borderRadius: '50px',
    padding: '1rem 2rem',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    backdropFilter: 'blur(15px)',
  },
  '& .MuiPaginationItem-root': {
    color: '#00d4ff',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    margin: '0 0.3rem',
    borderRadius: '50%',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 212, 255, 0.2)',
      border: '1px solid #00d4ff',
      transform: 'scale(1.1)',
      boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)',
    },
    '&.Mui-selected': {
      backgroundColor: '#00d4ff',
      color: '#000000',
      fontWeight: 'bold',
      transform: 'scale(1.2)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
    },
  },
});

const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '4rem 2rem',
  background: 'rgba(15, 15, 35, 0.6)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 0, 110, 0.3)',
  margin: '2rem 0',
});

function Shop({ products, addToCart, loading }) {
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const [animatedCards, setAnimatedCards] = React.useState([]);
  const itemsPerPage = 6;

  // Capitalize the first letter of each category
  const capitalizeCategory = category => category.charAt(0).toUpperCase() + category.slice(1);

  const uniqueCategories = Array.from(new Set(products.map(product => capitalizeCategory(product.category))));

  const filteredProducts = categoryFilter === 'all' ? products : products.filter(product => capitalizeCategory(product.category) === categoryFilter);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
    setAnimatedCards([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = event => {
    setCategoryFilter(event.target.value);
    setPage(1);
    setAnimatedCards([]);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(productsToShow.map((_, index) => index));
    }, 100);

    return () => clearTimeout(timer);
  }, [productsToShow]);

  if (loading) {
    return (
      <LoadingOverlay>
        <CircularProgress size={80} thickness={4} />
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#00d4ff', 
            fontWeight: '600',
            background: 'linear-gradient(45deg, #00d4ff, #ff006e)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Loading Amazing Products...
        </Typography>
      </LoadingOverlay>
    );
  }

  return (
    <ShopContainer maxWidth="lg">
      <HeaderSection>
        <ShopTitle variant="h1">
          CYBER SHOP
        </ShopTitle>
        <ShopSubtitle variant="h6">
          Discover cutting-edge products in our futuristic marketplace
        </ShopSubtitle>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <CategoryChip 
            icon={<GridView />} 
            label={`${products.length} Products`} 
          />
          <CategoryChip 
            icon={<FilterList />} 
            label={`${uniqueCategories.length} Categories`} 
          />
        </Box>
      </HeaderSection>

      <FilterSection>
        <ResultsInfo>
          <FilterList sx={{ color: '#00d4ff' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: '600' }}>
            Filter Products
          </Typography>
        </ResultsInfo>
        
        <CyberFormControl>
          <InputLabel id="category-filter-label">Select Category</InputLabel>
          <CyberSelect 
            labelId="category-filter-label" 
            id="category-filter" 
            value={categoryFilter} 
            label="Select Category" 
            onChange={handleCategoryChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: 'linear-gradient(145deg, #0f0f23, #1a1a2e)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(20px)',
                  '& .MuiMenuItem-root': {
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 212, 255, 0.2)',
                      color: '#00d4ff',
                      paddingLeft: '30px',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(0, 212, 255, 0.3)',
                      color: '#00d4ff',
                      fontWeight: 'bold',
                    },
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {uniqueCategories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </CyberSelect>
        </CyberFormControl>

        <ResultsInfo>
          <Typography variant="body1">
            Showing <strong style={{ color: '#00d4ff' }}>{productsToShow.length}</strong> of{' '}
            <strong style={{ color: '#ff006e' }}>{filteredProducts.length}</strong> products
          </Typography>
        </ResultsInfo>
      </FilterSection>

      {productsToShow.length === 0 ? (
        <EmptyState>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#ff006e', 
              fontWeight: '600', 
              marginBottom: '1rem' 
            }}
          >
            No Products Found
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)' 
            }}
          >
            Try selecting a different category or check back later for new arrivals!
          </Typography>
        </EmptyState>
      ) : (
        <ProductGrid container spacing={4}>
          {productsToShow.map((product, index) => (
            <Grid 
              item 
              key={product.id} 
              xs={12} 
              sm={6} 
              md={4} 
              className={animatedCards.includes(index) ? 'product-card-animated' : ''}
            >
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </ProductGrid>
      )}

      {pageCount > 1 && (
        <PaginationContainer>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange} 
            size="large"
            showFirstButton 
            showLastButton
          />
        </PaginationContainer>
      )}
    </ShopContainer>
  );
}

export default Shop;