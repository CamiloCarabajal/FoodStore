import React, { useState, useEffect } from 'react';
import ProductList from '../productList/ProductList';
import { useApiContext } from '../services/apiContext/ApiContext';
import ProductFilter from '../productFilter/ProductFilter'; 

const Dashboard = () => {
  const { products, isLoading } = useApiContext(); 
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Filtros seleccionados
  const handleFilterChange = (filters) => {
    let filtered = products;

    if (filters.stars && filters.stars !== '') {
      filtered = filtered.filter((product) => product.stars === parseInt(filters.stars));
    }
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= filters.maxPrice);
    }
    if (filters.searchName) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.searchName.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        {!isLoading ? (
          <h1 className="text-xl font-medium">Total results: {filteredProducts.length}</h1>
        ) : (
          <p className="text-xl font-medium">Loading...</p>
        )}
      </div>
      <ProductFilter onFilterChange={handleFilterChange} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Dashboard;
