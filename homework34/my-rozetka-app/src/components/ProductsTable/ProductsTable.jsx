import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Edit, Delete, UnfoldMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import ProductsModal from '../ProductsModal/ProductsModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const DEFAULT_IMAGE = '/images/laptop-common.jpg';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = useSelector(state => state.products?.list || []);

  const handleOpenEdit = (product = null) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleFormSubmit = (values) => {
    const formattedValues = {
      category: values.category,
      name: values.name,
      quantity: values.quantity,
      price: values.price,
      image: values.image || DEFAULT_IMAGE
    };

    if (selectedProduct && selectedProduct.id) {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: { ...formattedValues, id: selectedProduct.id }
      });
    } else {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: formattedValues
      });
    }

    setOpenModal(false);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch({ type: 'DELETE_PRODUCT', payload: selectedProduct.id });
    }
    setOpenDelete(false);
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
      <Header title="Products Table" onAddClick={() => handleOpenEdit()} />

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '1100px',
          borderRadius: '4px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#7ed391' }}>
            <TableRow>
              {['ID', 'Category', 'Name', 'Quantity', 'Price (₴)', 'Actions'].map((h) => (
                <TableCell
                  key={h}
                  sx={{ fontWeight: 'bold', color: '#2e7d32', border: 'none', py: 2 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {h} {h !== 'Actions' && <UnfoldMore sx={{ fontSize: 18, opacity: 0.8 }} />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    bgcolor: index % 2 === 0 ? '#ebebeb' : '#7ed391',
                    '& td': {
                      border: 'none',
                      color: index % 2 === 0 ? '#444' : 'white',
                      fontWeight: '600',
                      py: 1.5
                    }
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>
                    {Number(row.price).toLocaleString('en-US', {
                      minimumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => handleOpenEdit(row)} sx={{ color: 'inherit' }}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedProduct(row);
                          setOpenDelete(true);
                        }}
                        sx={{ color: 'inherit' }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ bgcolor: 'white' }}>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  Товари не знайдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductsModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />

      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default ProductsTable;
