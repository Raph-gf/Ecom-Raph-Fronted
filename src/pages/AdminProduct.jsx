import React, { useEffect, useState } from "react";
import TableProduct from "../components/TableProduct";
import CreateProductModal from "../components/CreateProductModal";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3456/products/all-products"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Users", error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div className="users flex flex-col gap-10 justify-center items-center text-3xl px-10 mb-10">
        <h1>Products</h1>
        <CreateProductModal />
      </div>

      {products &&
        products.map((product, index) => (
          <Link to={`/admin/${product._id}`}>
            <TableProduct
              key={index}
              name={product.name}
              price={product.price}
            />
          </Link>
        ))}
    </>
  );
}

export default AdminProduct;
