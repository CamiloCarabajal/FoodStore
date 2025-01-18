import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const ApiContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://6785f535f80b78923aa4ddb1.mockapi.io/api/product"
      );
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // POST
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "https://6785f535f80b78923aa4ddb1.mockapi.io/api/product",
        newProduct
      );
      // Actualizo el nuevo producto en pantalla
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setError(err.message);
    }
  };

  // DELETE
const deleteProduct = async (productId) => {
  try {
    await axios.delete(`https://6785f535f80b78923aa4ddb1.mockapi.io/api/product/${productId}`);
    // Elimino el producto de pantalla
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    setError(err.message);
  }
};

  // UPDATE
  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `https://6785f535f80b78923aa4ddb1.mockapi.io/api/product/${updatedProduct.id}`,
        updatedProduct
      );
      // Actualizo el producto en pantalla
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? response.data : product
        )
      );
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DataContext.Provider value={{ products, isLoading, error, addProduct, updateProduct, deleteProduct }}>
      {children}
    </DataContext.Provider>
  );
};

export default ApiContext;

export const useApiContext = () => useContext(DataContext);
