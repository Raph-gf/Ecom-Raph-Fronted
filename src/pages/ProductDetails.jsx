import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { IoCartOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";

function ProductDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user");
  const user = JSON.parse(userId);
  const currentUser = user._id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${productId}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <ErrorPage />;
  }

  const addProductToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3456/products/${productId}/addToCart/${currentUser}`
      );
      setCart(response.data);
      console.log(response.data);
      enqueueSnackbar("Product successfully added to cart", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/all-products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" py-8 my-auto">
        <div className="max-w-6xl mx-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between  md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg  dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={product.images}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2 ">
                  <button
                    onClick={addProductToCart}
                    className="w-full flex flex-row gap-2 items-center justify-center bg-black text-white py-4 px-4 rounded-full font-bold hover:bg-orange-200 hover:text-black"
                  >
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
                <p className="text-black  text-sm mt-2 mb-8">
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
