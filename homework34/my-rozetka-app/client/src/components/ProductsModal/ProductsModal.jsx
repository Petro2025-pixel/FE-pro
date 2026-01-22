import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Fade,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Field } from 'react-final-form';

const DEFAULT_IMAGE = '/images/laptop-common.jpg';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#D9D9D9',
  borderRadius: 1,
  boxShadow: 24,
  outline: 'none',
  overflow: 'hidden',
};

const labelStyle = {
  color: '#BBBBBB',
  fontSize: '12px',
  fontWeight: 'bold',
  mb: '2px',
  lineHeight: 1,
};

const inputStyles = {
  bgcolor: 'white',
  '& .MuiInputBase-root': {
    borderRadius: 0,
    fontSize: '14px',
    height: 32,
    color: '#4CAF50',
    fontWeight: 'bold',
    '& input': { padding: '0 10px' },
  },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
};

const ProductsModal = ({ open, handleClose, product, onSubmit }) => {
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'white',
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
              {product ? 'Edit product' : 'Add product'}
            </Typography>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'black' }}>
              <CloseIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>

          <Box sx={{ p: 2.5 }}>
            <Form
              initialValues={product || {}}
              onSubmit={values =>
                onSubmit({
                  ...values,
                  image: values.image?.trim() || DEFAULT_IMAGE,
                })
              }
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  {[
                    { name: 'category', label: 'Category' },
                    { name: 'name', label: 'Name' },
                    { name: 'quantity', label: 'Quantity' },
                    { name: 'price', label: 'Price' },
                    { name: 'image', label: 'Photo' },
                  ].map(item => (
                    <Box key={item.name} sx={{ mb: 1.5, height: '50px' }}>
                      <Typography sx={labelStyle}>{item.label}</Typography>
                      <Field name={item.name}>
                        {({ input }) => (
                          <TextField
                            {...input}
                            fullWidth
                            placeholder={`Enter ${item.label.toLowerCase()}...`}
                            sx={inputStyles}
                          />
                        )}
                      </Field>
                    </Box>
                  ))}

                  <Box sx={{ mb: 1.5 }}>
                    <Typography sx={labelStyle}>Description</Typography>
                    <Field name="description">
                      {({ input }) => (
                        <TextField
                          {...input}
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Enter description..."
                          sx={{
                            ...inputStyles,
                            '& .MuiInputBase-root': {
                              ...inputStyles['& .MuiInputBase-root'],
                              height: 'auto',
                              minHeight: 80,
                            },
                          }}
                        />
                      )}
                    </Field>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{
                        bgcolor: '#757070',
                        color: 'white',
                        px: 4,
                        borderRadius: 0,
                        textTransform: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#6DB37E',
                        color: 'white',
                        px: 4,
                        borderRadius: 0,
                        textTransform: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductsModal;
