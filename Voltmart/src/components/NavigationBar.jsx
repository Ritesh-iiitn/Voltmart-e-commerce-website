import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Badge, InputBase, useMediaQuery, Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './SearchResults';
import { debounce } from 'lodash';

function NavigationBar({ cartItemCount }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false); // Loading state for search
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // State to track login status
  const searchBarRef = React.useRef(null);
  const searchResultsRef = React.useRef(null); // To detect clicks outside search results
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  // Check if user is logged in by looking for token in localStorage
  React.useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('MERNEcommerceToken');
      setIsLoggedIn(!!token); // Set loggedIn state based on token presence
    };
    checkToken(); // Initial check
    const interval = setInterval(checkToken, 2000); // Check every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value); // Trigger the debounced search
  };

  const handleSearchResultClick = () => {
    setSearchResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('MERNEcommerceToken'); // Remove token from localStorage
    setIsLoggedIn(false);
    navigate('/'); // Redirect to homepage after logout
  };

  // Debounced function to prevent triggering the search too often
  const debouncedSearch = React.useCallback(
    debounce(async query => {
      if (query.trim() === '') {
        setSearchResults([]); // Clear search results if the query is empty
        setLoading(false);
        return;
      }
      setLoading(true); // Set loading to true when search is triggered
      try {
        const response = await axios.get(`https://fusion-electronics-api.vercel.app/api/search?q=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      } finally {
        setLoading(false); // Stop loading when the API call finishes
      }
    }, 300), // 300ms debounce delay
    []
  );

  // Event listener to hide search results if clicking outside search bar or results
  React.useEffect(() => {
    const handleClickOutside = event => {
      // Check if click is outside search bar and search results
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]); // Hide search results on outside click
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener on unmount
    };
  }, []);

  return (
<AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        borderBottom: '2px solid #00d4ff',
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
        marginBottom: '2rem',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
        },
        '& .logo-link': {
          textDecoration: 'none',
          color: '#00d4ff',
          fontWeight: '900',
          fontSize: '2rem',
          fontFamily: '"Orbitron", "Roboto", sans-serif',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            width: '0',
            height: '2px',
            background: 'linear-gradient(90deg, #00d4ff, #ff006e)',
            transition: 'width 0.4s ease',
          },
          '&:hover': {
            color: '#ff006e',
            transform: 'translateY(-2px)',
            filter: 'drop-shadow(0 0 15px #00d4ff)',
            '&::after': {
              width: '100%',
            },
          },
        },
        '& .search-bar': {
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '50px',
          padding: '0.8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          width: '60%',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
            transition: 'left 0.6s ease',
          },
          '&:hover': {
            border: '1px solid rgba(0, 212, 255, 0.6)',
            boxShadow: '0 0 25px rgba(0, 212, 255, 0.2)',
            transform: 'scale(1.02)',
            '&::before': {
              left: '100%',
            },
          },
          '&:focus-within': {
            border: '1px solid #00d4ff',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
            background: 'rgba(0, 212, 255, 0.1)',
          },
        },
        '& .search-bar input': {
          marginLeft: '1rem',
          border: 'none',
          outline: 'none',
          color: '#ffffff',
          backgroundColor: 'transparent',
          width: '100%',
          fontSize: '1.1rem',
          fontWeight: '400',
          '&::placeholder': {
            color: 'rgba(255,255,255,0.6)',
            fontStyle: 'normal',
          },
        },
        '& .cyber-button': {
          position: 'relative',
          fontSize: '0.95rem',
          fontWeight: '600',
          margin: '0 0.4rem',
          padding: '0.7rem 1.5rem',
          background: 'transparent',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          borderRadius: '0',
          color: '#00d4ff',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent)',
            transition: 'left 0.5s ease',
          },
          '&:hover': {
            color: '#0f0f23',
            background: '#00d4ff',
            border: '1px solid #00d4ff',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
            transform: 'translateY(-2px)',
            '&::before': {
              left: '100%',
            },
          },
        },
        '& .active': {
          background: 'rgba(0, 212, 255, 0.2)',
          color: '#ffffff',
          border: '1px solid #00d4ff',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
        },
        '& .logout-button': {
          position: 'relative',
          background: 'linear-gradient(45deg, #ff006e, #8338ec)',
          border: '1px solid #ff006e',
          color: 'white',
          fontWeight: '700',
          margin: '0 0.4rem',
          padding: '0.7rem 1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s ease',
          },
          '&:hover': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 8px 25px rgba(255, 0, 110, 0.4)',
            '&::before': {
              left: '100%',
            },
          },
        },
        '& .cart-icon': {
          marginLeft: '1rem',
          padding: '0.6rem',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          borderRadius: '50%',
          background: 'rgba(0, 212, 255, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: 'conic-gradient(from 0deg, #00d4ff, #ff006e, #8338ec, #00d4ff)',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: -1,
          },
          '&:hover': {
            transform: 'scale(1.15) rotate(5deg)',
            background: 'rgba(0, 212, 255, 0.2)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            '&::before': {
              opacity: 1,
            },
          },
        },
        '& .menu-icon': {
          border: '1px solid rgba(0, 212, 255, 0.4)',
          borderRadius: '8px',
          padding: '0.5rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(0, 212, 255, 0.2)',
            border: '1px solid #00d4ff',
            transform: 'rotate(90deg)',
          },
        },
      }}
    >
      <Toolbar sx={{ minHeight: '80px', padding: '0 2rem' }}>
        {isMobile ? (
          <>
            <IconButton 
              size="large" 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              onClick={handleClick}
              className="menu-icon"
            >
              <MenuIcon sx={{ color: '#00d4ff' }} />
            </IconButton>
            <Menu 
              id="mobile-menu" 
              anchorEl={anchorEl} 
              open={open} 
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  background: 'linear-gradient(145deg, #0f0f23, #1a1a2e)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(20px)',
                },
                '& .MuiMenuItem-root': {
                  color: '#00d4ff',
                  fontWeight: '600',
                  padding: '15px 30px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#ffffff',
                    paddingLeft: '40px',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/shop">
                Shop
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/cart">
                Cart
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Link to="/" className="logo-link">
                VOLTMART
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="logo-link">
                VOLTMART
              </Link>
            </Typography>
            <form className="search-bar" ref={searchBarRef} onSubmit={e => e.preventDefault()}>
              <SearchIcon sx={{ 
                color: '#00d4ff', 
                fontSize: '1.4rem',
                filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))',
              }} />
              <InputBase
                placeholder="Enter your search query..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '100%' }}
              />
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: '#00d4ff',
                    marginLeft: '15px',
                    filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.8))',
                  }}
                />
              )}
            </form>
            <Button
              color="inherit"
              component={Link}
              to="/"
              className={`cyber-button ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/shop"
              className={`cyber-button ${location.pathname === '/shop' ? 'active' : ''}`}
            >
              Shop
            </Button>

            {isLoggedIn ? (
              <Button onClick={handleLogout} className="logout-button">
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  className="cyber-button"
                >
                  Login
                </Button>
              </>
            )}
            <Button 
              color="inherit" 
              component={Link} 
              to="/register" 
              className="cyber-button"
            >
              Register
            </Button>

            <IconButton 
              color="inherit" 
              component={Link} 
              to="/cart" 
              className="cart-icon"
            >
              <Badge 
                badgeContent={cartItemCount} 
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(45deg, #ff006e, #8338ec)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    minWidth: '22px',
                    height: '22px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
                  },
                }}
              >
                <ShoppingCartIcon sx={{ 
                  fontSize: '1.5rem', 
                  color: '#00d4ff',
                  filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))',
                }} />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>

      {searchResults.length > 0 && searchBarRef.current && (
        <Box
          ref={searchResultsRef}
          sx={{
            position: 'absolute',
            top: searchBarRef.current.getBoundingClientRect().bottom + 12 + 'px',
            left: searchBarRef.current.getBoundingClientRect().left + 'px',
            zIndex: 1000,
            background: 'linear-gradient(145deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
            width: '350px',
            overflow: 'hidden',
            animation: 'cyberpunkSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
            },
            '@keyframes cyberpunkSlide': {
              from: {
                opacity: 0,
                transform: 'translateY(-20px) scale(0.9)',
                filter: 'blur(10px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                filter: 'blur(0px)',
              },
            },
          }}
        >
          <SearchResults 
            results={searchResults} 
            onResultClick={handleSearchResultClick} 
            setSearchResults={setSearchResults} 
          />
        </Box>
      )}
    </AppBar>
  );
}

export default NavigationBar;
