import React, { useState } from 'react';
import { Modal, Button, IconButton, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useApiContext } from '../services/apiContext/ApiContext';

const UpdateDeleteProduct = ({ open, onClose, product }) => {
  const { updateProduct, deleteProduct } = useApiContext(); // Traigo del contexto las funciones

  const [action, setAction] = useState(null); // actualizar o borrar
  const [name, setName] = useState(product?.name || '');
  const [ingredients, setIngredients] = useState(product?.ingredients || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || 'In Stock');
  const [stars, setStars] = useState(product?.rating || 0);
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');

  const handleClose = () => {
    setAction(null);
    onClose();
  };

  const handleUpdate = () => {
    if (!product || !product.id) {
      console.error("No existe el id o esta vacio");
      return;
    }
    updateProduct({
      id: product.id,
      name,
      ingredients,
      price,
      stock,
      stars,
      imageUrl,
    });
    handleClose();
  };

  const handleDelete = () => {
    if (!product || !product.id) {
      console.error("No existe el id o esta vacio");
      return;
    }
    deleteProduct(product.id);
    handleClose();
  };

  return (
    <>
      <Modal open={open && !action} onClose={onClose}>
        <div className="flex justify-center items-center w-full h-full">
          <div className="relative bg-white p-6 rounded-md shadow-lg w-3/4 max-w-md">
            <IconButton
              aria-label="close"
              onClick={onClose}
              className="absolute top-2 right-2"
            >
              <CloseIcon />
            </IconButton>
            <h2 className="text-2xl font-bold text-purple-500 mb-4">Update or Delete Product</h2>
            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAction('update')}
                style={{ backgroundColor: '#e0b3ff', width: '150px' }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setAction('delete')}
                style={{ backgroundColor: '#ff4d4d', width: '150px' }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {action === 'update' && (
        <Modal open={true} onClose={handleClose}>
          <div className="flex justify-center items-center w-full h-full">
            <div className="relative bg-white p-6 rounded-md shadow-lg w-3/4 max-w-2xl">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className="absolute top-2 right-2"
              >
                <CloseIcon />
              </IconButton>
              <h2 className="text-2xl font-bold text-purple-500 mb-4">Update Product</h2>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Name of food"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Ingredients"
                  variant="outlined"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Stock</InputLabel>
                  <Select
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    label="Stock"
                  >
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Number of stars</InputLabel>
                  <Select
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    label="Number of stars"
                  >
                    {[...Array(6).keys()].map((star) => (
                      <MenuItem key={star} value={star}>
                        {star}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  style={{ backgroundColor: '#e0b3ff', width: '150px' }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {action === 'delete' && (
        <Modal open={true} onClose={handleClose}>
          <div className="flex justify-center items-center w-full h-full">
            <div className="relative bg-white p-6 rounded-md shadow-lg w-3/4 max-w-md">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className="absolute top-2 right-2"
              >
                <CloseIcon />
              </IconButton>
              <div className="flex justify-center mb-4">
                <HighlightOffIcon fontSize="inherit" className="text-red-500" style={{ fontSize: 90 }} />
              </div>
              <h1 className="text-2xl font-semibold text-black mb-4"><strong>Are you sure you want to delete this item?</strong></h1>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  style={{ width: '150px' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  style={{ width: '150px' }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateDeleteProduct;
