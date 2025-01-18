import React, { useState } from 'react';
import { Modal, Button, TextField, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateProduct = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('In Stock');
  const [stars, setStars] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleCreate = () => {
    const newProduct = {
      name,
      ingredients,
      price,
      stock,
      stars,
      imageUrl,
    };
    onCreate(newProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative bg-white p-6 rounded-md shadow-lg w-3/4 max-w-2xl">
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="absolute top-2 right-2"
          >
            <CloseIcon />
          </IconButton>
          <h2 className="text-2xl font-bold text-purple-500 mb-4">Create Product</h2>
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
                  <MenuItem key={star} value={star}>{star}</MenuItem>
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
              onClick={handleCreate}
              style={{ backgroundColor: '#e0b3ff', width: '150px' }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProduct;
