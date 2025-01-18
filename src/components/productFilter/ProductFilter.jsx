import React, { useState, useEffect } from 'react'; 
import { TextField, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateProduct from '../createProduct/CreateProduct';
import { useApiContext } from '../services/apiContext/ApiContext';

const ProductFilter = ({ onFilterChange }) => {
  const { addProduct } = useApiContext(); 
  const [stars, setStars] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchName, setSearchName] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleFilterChange();
  }, [stars, minPrice, maxPrice, searchName]);


  const handleFilterChange = () => {
    onFilterChange({
      stars,
      minPrice,
      maxPrice,
      searchName,
    });
  };

  // Muestro modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
      <div className="flex items-center justify-between gap-2 mb-2">
        <FormControl variant="outlined" className="w-48">
          <InputLabel>Select Category</InputLabel>
          <Select
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            label="Select Category"
            style={{ backgroundColor: '#f0f0f0' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Min Price"
          type="number"
          variant="outlined"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-20"
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <TextField
          label="Max Price"
          type="number"
          variant="outlined"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-20"
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-64"
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <IconButton
          color="secondary"
          onClick={handleOpenModal}
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            backgroundColor: '#e0b3ff',
            boxShadow: '0 4px 8px rgba(128, 0, 128, 0.5)',
          }}
        >
          <AddIcon />
        </IconButton>
      </div>

      <CreateProduct
        open={openModal}
        onClose={handleCloseModal}
        onCreate={(product) => {
          addProduct(product);  // Llamo al POST 
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default ProductFilter;