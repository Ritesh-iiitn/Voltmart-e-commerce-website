import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CircularProgress, IconButton, InputAdornment, styled, Alert, LinearProgress } from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock, PersonAdd, LoginOutlined, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';

const RegisterContainer = styled(Container)({
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
    background: 'radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 0, 110, 0.15), transparent 50%), radial-gradient(circle at 40% 40%, rgba(131, 56, 236, 0.1), transparent 50%)',
    pointerEvents: 'none',
  },
});

const RegisterCard = styled(Box)({
  background: 'linear-gradient(145deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
  backdropFilter: 'blur(20px)',
  border: '2px solid transparent',
  borderImage: 'linear-gradient(45deg, #00d4ff, #ff006e, #8338ec) 1',
  borderRadius: '25px',
  padding: '3rem',
  maxWidth: '550px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 212, 255, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #ff006e, #8338ec, #00d4ff)',
    animation: 'borderPulse 4s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '15%',
    left: '-10%',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(131, 56, 236, 0.1), transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  '@keyframes borderPulse': {
    '0%, 100%': { opacity: 1, transform: 'scaleX(1)' },
    '50%': { opacity: 0.8, transform: 'scaleX(0.98)' },
  },
});

const RegisterTitle = styled(Typography)({
  fontWeight: '900',
  fontSize: '3rem',
  background: 'linear-gradient(45deg, #ff006e, #8338ec, #00d4ff)',
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
    width: '100px',
    height: '3px',
    background: 'linear-gradient(90deg, #ff006e, #8338ec)',
    borderRadius: '2px',
  },
});

const RegisterSubtitle = styled(Typography)({
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
    '&.Mui-error': {
      border: '1px solid rgba(255, 0, 110, 0.6)',
      background: 'rgba(255, 0, 110, 0.05)',
      '&:hover': {
        border: '1px solid rgba(255, 0, 110, 0.8)',
        background: 'rgba(255, 0, 110, 0.1)',
      },
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
    '&.Mui-error': {
      color: '#ff006e',
    },
  },
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      color: '#00d4ff',
      fontSize: '1.3rem',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#ff006e',
    fontWeight: '500',
  },
});

const CyberButton = styled(Button)({
  background: 'linear-gradient(45deg, #ff006e, #8338ec)',
  border: '2px solid #ff006e',
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
    boxShadow: '0 15px 40px rgba(255, 0, 110, 0.4)',
    background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
    border: '2px solid #00d4ff',
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

const PasswordStrengthIndicator = styled(Box)({
  marginTop: '0.5rem',
  marginBottom: '1rem',
});

const StrengthBar = styled(LinearProgress)({
  height: '6px',
  borderRadius: '3px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '3px',
    transition: 'all 0.3s ease',
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
    color: '#ff006e',
  },
});

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    color: '#ff006e',
    filter: 'drop-shadow(0 0 20px rgba(255, 0, 110, 0.5))',
    animation: 'rotate 3s linear infinite',
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

const ValidationIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '0.5rem',
});

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(password);
  const getStrengthColor = (strength) => {
    if (strength < 25) return '#ff006e';
    if (strength < 50) return '#ff6b35';
    if (strength < 75) return '#f9ca24';
    return '#00d4ff';
  };

  const getStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;
  const isPasswordMismatch = confirmPassword && password !== confirmPassword;

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordStrength < 50) {
      setError('Password is too weak. Please choose a stronger password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://fusion-electronics-api.vercel.app/api/auth/register', { name, email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.msg || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <RegisterContainer maxWidth={false}>
      <RegisterCard>
        <IconContainer>
          <PersonAdd />
        </IconContainer>
        
        <RegisterTitle variant="h2">
          CREATE PROFILE
        </RegisterTitle>
        
        <RegisterSubtitle variant="body1">
          Join the cyber marketplace and unlock exclusive access
        </RegisterSubtitle>

        {error && (
          <ErrorAlert severity="error" variant="outlined">
            {error}
          </ErrorAlert>
        )}

        <form onSubmit={handleRegister}>
          <CyberTextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

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

          {password && (
            <PasswordStrengthIndicator>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Password Strength:
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getStrengthColor(passwordStrength), 
                    fontWeight: 'bold',
                    marginLeft: '0.5rem',
                  }}
                >
                  {getStrengthText(passwordStrength)}
                </Typography>
              </Box>
              <StrengthBar
                variant="determinate"
                value={passwordStrength}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getStrengthColor(passwordStrength),
                  },
                }}
              />
            </PasswordStrengthIndicator>
          )}

          <CyberTextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            error={isPasswordMismatch}
            helperText={isPasswordMismatch ? "Passwords don't match" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {confirmPassword && (
                      <ValidationIcon>
                        {isPasswordMatch ? (
                          <CheckCircle sx={{ color: '#00d4ff', fontSize: '1.2rem' }} />
                        ) : isPasswordMismatch ? (
                          <Cancel sx={{ color: '#ff006e', fontSize: '1.2rem' }} />
                        ) : null}
                      </ValidationIcon>
                    )}
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                      sx={{ 
                        color: '#00d4ff',
                        marginLeft: '0.5rem',
                        '&:hover': {
                          background: 'rgba(0, 212, 255, 0.1)',
                        },
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {loading ? (
            <LoadingContainer>
              <CircularProgress size={40} thickness={4} />
              <Typography sx={{ color: '#ff006e', fontWeight: '600' }}>
                Creating your profile...
              </Typography>
            </LoadingContainer>
          ) : (
            <CyberButton 
              type="submit" 
              variant="contained" 
              size="large"
              startIcon={<PersonAdd />}
            >
              Initialize Profile
            </CyberButton>
          )}
        </form>

        <LinkContainer>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <LoginOutlined sx={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Already have an account? <a href="/login">Access your profile</a>
          </Typography>
        </LinkContainer>
      </RegisterCard>
    </RegisterContainer>
  );
}

export default Register;