import React, { useEffect, useState } from "react";
import TableProduct from "../components/TableProduct";
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
      <div className="users flex gap-10 justify-center  text-3xl px-10 mb-10">
        <h1>Products</h1>
        <Link to="/admin/create-product">
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create Product
          </button>
        </Link>
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
