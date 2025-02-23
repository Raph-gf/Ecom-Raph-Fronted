import React, { useEffect, useState } from "react";
import TableProduct from "../components/TableProduct";
import CreateProductModal from "../components/CreateProductModal";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/all-products`
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="admin-products-container flex items-center gap-10 justify-start text-3xl pb-3 px-10 mt-16 mb-10">
        <h1>Products</h1>
        <CreateProductModal />
      </div>

      {products &&
        products.map((product, index) => (
          <Link key={index} to={`/admin/${product._id}`}>
            <TableProduct
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          </Link>
        ))}
    </>
  );
}

export default AdminProduct;
