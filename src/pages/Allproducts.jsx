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
          "http://localhost:3456/products/all-products"
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
          <h1 className="title text-8xl w-full mb-8 font-bold px-7 mt-16">
            <span className=" text-orange-300 mr-2">D</span>ISCOVER OUT ALL OF
            OUR PRODUCTS
          </h1>
          <div className="description w-3/4 mb-20">
            <p className="undertext mb-8 px-7">
              Discover our exquisite selection of products designed to beautify
              your home! Whether you're looking to add a touch of elegance,
              comfort, or functionality, we have everything you need to
              transform your space into a true sanctuary.{" "}
            </p>
            <p className="undertext mb-8 px-7">
              Explore our diverse range, from decorative accessories to designer
              furniture, luxurious textiles, and practical equipment.Make your
              house a reflection of your style and personality Make your house a
              reflection of your style and personality
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-7 w-screen px-7 ">
        {allproducts.map((product, index) => (
          <Link to={`/products/${product._id}`} key={index}>
            <Card
              key={index}
              image={product.images}
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
