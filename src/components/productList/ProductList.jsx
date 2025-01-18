import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdateDeleteProduct from "../updateDeleteProduct/updateDeleteProduct";
import { useApiContext } from "../services/apiContext/ApiContext";

const ProductList = ({ products: filteredProducts }) => {
  const { products, isLoading, updateProduct, deleteProduct } = useApiContext(); // Usa el contexto
  const [anchorEl, setAnchorEl] = useState(null); // Controla el menú
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el modal

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        <CircularProgress size={80} />{" "}
      </Box>
    );
  }

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product); // Seteo el producto actual
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true); // Abre el modal
    handleMenuClose(); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    await updateProduct(updatedProduct); // Llamo a la función de update del contexto
    handleModalClose();
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId); // Llamo a la función de delete del contexto
    handleModalClose();
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          className="relative flex flex-col sm:flex-row bg-gray-700 text-white shadow-lg rounded-lg"
        >
          <div className="absolute top-2 right-2">
            <IconButton
              aria-label="options"
              onClick={(event) => handleMenuOpen(event, product)}
              size="small"
            >
              <MoreVertIcon style={{ color: "#e0b3ff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedProduct?.id === product.id}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleModalOpen}>Options</MenuItem>
            </Menu>
          </div>

          <div className="w-full sm:w-1/3 p-4 flex justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full object-cover rounded-lg"
            />
          </div>

          <CardContent className="flex flex-col justify-between w-full sm:w-2/3 p-4">
            <div className="mb-4">
              <Typography
                variant="h5"
                className="font-bold mb-1 text-left"
                style={{ marginBottom: "0.5em" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-400 text-left"
                style={{ marginBottom: "1em" }}
              >
                <span className="font-bold text-grey">Description</span>{" "}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-400 text-left"
                style={{ marginBottom: "1em" }}
              >
                {product.description || "Sin descripción."}
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
              <Typography
                variant="body1"
                className="flex items-center font-normal"
              >
                <span className="font-bold mr-1">Price:</span> ${product.price}
              </Typography>
              <Typography
                variant="body1"
                className="flex items-center font-normal"
              >
                <span className="font-bold mr-1">Availability:</span>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    product.stock
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.stock ? "In Stock" : "Out of Stock"}
                </span>
              </Typography>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    style={{
                      color: i < product.stars ? "#FFD700" : "#555",
                      fontSize: "1.2em",
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {selectedProduct && (
        <UpdateDeleteProduct
          open={isModalOpen}
          onClose={handleModalClose}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
