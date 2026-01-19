import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Header from '../Header/Header';
import ProductsModal from '../ProductsModal/ProductsModal';

const DEFAULT_IMAGE = '/images/laptop-common.jpg';

const ProductPreview = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const API_BASE =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001'
      : window.location.origin;

  const fetchProducts = () => {
    axios
      .get(`${API_BASE}/products`)
      .then(response => setProducts(response.data))
      .catch(err => console.error('Loading error:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, [API_BASE]);

  const handleFormSubmit = (values) => {
    const newProduct = {
      ...values,
      id: Date.now(),
      image: values.image || DEFAULT_IMAGE
    };

    const updatedList = [...products, newProduct];

    axios.post(`${API_BASE}/products`, updatedList).then(() => {
      fetchProducts();
      setOpenModal(false);
    });
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#6db37e',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Header title="Preview" onAddClick={() => setOpenModal(true)} />

      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: 'flex' }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 0,
                  boxShadow: 'none',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  minHeight: '380px'
                }}
              >
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
                    image={
                      item.image
                        ? item.image.startsWith('http')
                          ? item.image
                          : `${API_BASE}${item.image}`
                        : DEFAULT_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE;
                    }}
                    sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  align="left"
                  sx={{
                    height: '3em',
                    mb: 2,
                    fontWeight: 500,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.5em'
                  }}
                >
                  {item.name}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                      alignItems: 'baseline'
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#f37133', fontWeight: 'bold' }}>
                      {item.price}₴
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Кількість: {item.quantity}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderTop: '1px solid #eee',
                      pt: 1.5,
                      color: '#4caf50'
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ mr: 1, fontSize: '20px' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Готовий до відправки
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ProductsModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        product={null}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default ProductPreview;
