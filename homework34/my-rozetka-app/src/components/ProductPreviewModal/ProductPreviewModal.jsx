import React from 'react';
import {
  Modal,
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Backdrop,
  Fade,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ProductPreviewModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : window.location.origin;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400, 
            outline: 'none'
          }}
        >
          
          <Card
            sx={{
              p: 3,
              borderRadius: 1,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              bgcolor: 'white',
              position: 'relative'
            }}
          >
         
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'black',
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': { bgcolor: 'white' }
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                height: 180,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                overflow: 'hidden'
              }}
            >
              <CardMedia
                component="img"
                image={product.image?.startsWith('http') ? product.image : `${API_BASE}${product.image}`}
                alt={product.name}
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: 0.5
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: '#6db37e',
                fontWeight: 600,
                mb: 0.5,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.75rem'
              }}
            >
              {product.category}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: '#2c3e50',
                fontSize: '1rem',
                lineHeight: 1.3,
                minHeight: '2.6em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {product.name}
            </Typography>

            {product.description && product.description.trim() && (
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  mb: 2,
                  lineHeight: 1.4,
                  fontSize: '0.85rem',
                  minHeight: '4.2em',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {product.description}
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                pb: 2,
                borderBottom: '1px solid #eee'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#f37133',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                {Number(product.price).toLocaleString('en-US')}₴
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                В наявності: {product.quantity} шт.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8f9fa',
                p: 1.5,
                borderRadius: 0.5,
                mb: 2
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ mr: 1.5, fontSize: '20px', color: '#4caf50' }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#4caf50', fontSize: '0.9rem' }}
              >
                Готовий до відправки
              </Typography>
            </Box>

            <Button
              fullWidth
              onClick={handleClose}
              sx={{
                bgcolor: '#6db37e',
                color: 'white',
                py: 1,
                fontSize: '0.9rem',
                fontWeight: 'bold',
                borderRadius: 0,
                textTransform: 'none',
                '&:hover': { bgcolor: '#5da16d' }
              }}
            >
              Close
            </Button>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductPreviewModal;