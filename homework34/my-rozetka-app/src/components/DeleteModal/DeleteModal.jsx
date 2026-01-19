import React from 'react';
import { Modal, Box, Typography, Button, Backdrop, Fade } from '@mui/material';

const deleteModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'white',
  p: 4,
  textAlign: 'center',
  outline: 'none',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.2)', 
};

const DeleteModal = ({ open, handleClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ 
        backdrop: { 
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } 
        } 
      }}
    >
      <Fade in={open}>
        <Box sx={deleteModalStyle}>
          
          <Typography variant="h6" sx={{ color: '#6db37e', fontWeight: 'bold', mb: 4 }}>
            Are you sure you want to delete this product?
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            
            <Button 
              onClick={handleClose}
              sx={{ 
                bgcolor: '#dadada', 
                color: 'white', 
                px: 5, 
                borderRadius: 0, 
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { bgcolor: '#c0c0c0' }
              }}
            >
              Cancel
            </Button>
            
      
            <Button 
              onClick={onConfirm}
              sx={{ 
                bgcolor: '#f44336', 
                color: 'white', 
                px: 5, 
                borderRadius: 0, 
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { bgcolor: '#d32f2f' }
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;