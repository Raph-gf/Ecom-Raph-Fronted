import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Allproducts() {
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    const displayProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/all-products`
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    displayProducts();
  }, []);

  return (
    <>
      <div className="text-section w-full">
        <div className="text-section w-full">
          <h1 className="title text-6xl w-full mb-8 font-bold px-7 mt-16">
            <span className="text-orange-300">S</span>hop
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-7 w-screen px-7 ">
        {allproducts.map((product, index) => (
          <Link to={`/products/${product._id}`} key={index}>
            <Card
              key={index}
              images={product.images}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Allproducts;
