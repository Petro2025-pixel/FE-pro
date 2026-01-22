import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginRequest } from '../../store/slices/authSlice';

const validate = values => {
  const errors = {};
  if (!values.username) errors.username = ' ';
  if (!values.password) errors.password = ' ';
  return errors;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { token, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const onSubmit = values => {
    dispatch(loginRequest(values));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#6db37e',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 6,
          width: '100%',
          maxWidth: 450,
          textAlign: 'center',
          bgcolor: '#f5f5f5',
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 6 }}>
          <img src="/rozetka.svg" alt="logo" style={{ width: 45, height: 45, marginRight: 10 }} />
          <Typography variant="h4" sx={{ color: '#6db37e', fontWeight: 900, letterSpacing: 2 }}>
            ROZETKA
          </Typography>
        </Box>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, invalid, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    placeholder="User Name"
                    variant="filled"
                    hiddenLabel
                    error={meta.touched && meta.error}
                    sx={{
                      mb: 4,
                      bgcolor: '#dadada',
                      '& .MuiFilledInput-root': { borderRadius: 0 },
                    }}
                  />
                )}
              </Field>

              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    variant="filled"
                    hiddenLabel
                    error={meta.touched && meta.error}
                    sx={{
                      mb: 4,
                      bgcolor: '#dadada',
                      '& .MuiFilledInput-root': { borderRadius: 0 },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? (
                              <VisibilityOff sx={{ color: '#6db37e' }} />
                            ) : (
                              <Visibility sx={{ color: '#6db37e' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={loading || invalid || pristine}
                sx={{
                  bgcolor: '#6db37e',
                  color: 'white',
                  py: 1.5,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#5da16d' },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </form>
          )}
        />
        <Box sx={{ height: 100 }} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
