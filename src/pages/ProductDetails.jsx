import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import ErrorPage from "./ErrorPage";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${productId}`
        );
        setProduct(response.data);
        console.log(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className=" py-8 my-auto">
        <div className="max-w-6xl mx-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between  md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg  dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={product.image}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2 ">
                  <button className="w-full flex flex-row gap-2 items-center justify-center bg-black text-white py-4 px-4 rounded-full font-bold hover:bg-orange-200 hover:text-black">
                    Add to Cart
                    <IoCartOutline />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-6xl font-bold text-black mb-10">
                {product.name}
              </h2>

              <div>
                <p className="font-bold text-black">Description:</p>
                <p className="text-black  text-sm mt-2 mb-14">
                  {product.description}
                </p>
              </div>
              <div className="flex mb-4">
                <div className="mr-4 text-black">
                  <span className=" text-5xl font-bold text-black">
                    {product.price}$
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
