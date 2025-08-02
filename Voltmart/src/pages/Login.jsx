import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CircularProgress, IconButton, InputAdornment, styled, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, LoginOutlined, PersonAdd, VpnKey } from '@mui/icons-material';
import axios from 'axios';

const LoginContainer = styled(Container)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #000000 0%, #0a0a0f 30%, #1a1a2e 70%, #000000 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 0, 110, 0.1), transparent 50%)',
    pointerEvents: 'none',
  },
});

const LoginCard = styled(Box)({
  background: 'linear-gradient(145deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
  backdropFilter: 'blur(20px)',
  border: '2px solid transparent',
  borderImage: 'linear-gradient(45deg, #00d4ff, #ff006e, #8338ec) 1',
  borderRadius: '25px',
  padding: '3rem',
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 0 50px rgba(0, 212, 255, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e, #8338ec, #00d4ff)',
    animation: 'borderGlow 3s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '-20%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  '@keyframes borderGlow': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 },
  },
});

const LoginTitle = styled(Typography)({
  fontWeight: '900',
  fontSize: '3rem',
  background: 'linear-gradient(45deg, #00d4ff, #ff006e)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '0.5rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e)',
    borderRadius: '2px',
  },
});

const LoginSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  marginBottom: '2.5rem',
  fontSize: '1.1rem',
  fontWeight: '300',
});

const CyberTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    background: 'rgba(0, 212, 255, 0.05)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '15px',
    color: '#ffffff',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 212, 255, 0.1)',
      border: '1px solid rgba(0, 212, 255, 0.5)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
    },
    '&.Mui-focused': {
      background: 'rgba(0, 212, 255, 0.15)',
      border: '1px solid #00d4ff',
      boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.1rem',
    fontWeight: '500',
    '&.Mui-focused': {
      color: '#00d4ff',
    },
  },
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      color: '#00d4ff',
      fontSize: '1.3rem',
    },
  },
});

const CyberButton = styled(Button)({
  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
  border: '2px solid #00d4ff',
  borderRadius: '25px',
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: '700',
  padding: '15px 40px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  marginBottom: '2rem',
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
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)',
    background: 'linear-gradient(45deg, #ff006e, #8338ec)',
    border: '2px solid #ff006e',
    '&::before': {
      left: '100%',
    },
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const LinkContainer = styled(Box)({
  textAlign: 'center',
  '& a': {
    color: '#00d4ff',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: '0',
      height: '2px',
      background: 'linear-gradient(90deg, #00d4ff, #ff006e)',
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      color: '#ff006e',
      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
      '&::after': {
        width: '100%',
      },
    },
  },
});

const ErrorAlert = styled(Alert)({
  backgroundColor: 'rgba(255, 0, 110, 0.1)',
  border: '1px solid rgba(255, 0, 110, 0.3)',
  borderRadius: '15px',
  color: '#ff006e',
  marginBottom: '1.5rem',
  '& .MuiAlert-icon': {
    color: '#ff006e',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  '& .MuiCircularProgress-root': {
    color: '#00d4ff',
  },
});

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    color: '#00d4ff',
    filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
    animation: 'pulse 2s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
  },
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://fusion-electronics-api.vercel.app/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('MERNEcommerceToken', token);
      window.location.href = '/';
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.msg || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginCard>
        <IconContainer>
          <LoginOutlined />
        </IconContainer>
        
        <LoginTitle variant="h2">
          ACCESS PORTAL
        </LoginTitle>
        
        <LoginSubtitle variant="body1">
          Enter your credentials to access the cyber marketplace
        </LoginSubtitle>

        {error && (
          <ErrorAlert severity="error" variant="outlined">
            {error}
          </ErrorAlert>
        )}

        <form onSubmit={handleLogin}>
          <CyberTextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          
          <CyberTextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    sx={{ 
                      color: '#00d4ff',
                      '&:hover': {
                        background: 'rgba(0, 212, 255, 0.1)',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {loading ? (
            <LoadingContainer>
              <CircularProgress size={40} thickness={4} />
              <Typography sx={{ color: '#00d4ff', fontWeight: '600' }}>
                Authenticating...
              </Typography>
            </LoadingContainer>
          ) : (
            <CyberButton 
              type="submit" 
              variant="contained" 
              size="large"
              startIcon={<LoginOutlined />}
            >
              Initialize Login
            </CyberButton>
          )}
        </form>

        <LinkContainer>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
            <VpnKey sx={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            <a href="/forgot-password">Forgot your access code?</a>
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <PersonAdd sx={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Need an account? <a href="/register">Create new profile</a>
          </Typography>
        </LinkContainer>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;