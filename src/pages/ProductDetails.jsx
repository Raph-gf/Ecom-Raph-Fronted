import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { IoCartOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { Carousel } from "flowbite-react";
import { userInfos } from "../context";

function ProductDetails() {
  const { userId } = userInfos();
  console.log(userId);
  const { enqueueSnackbar } = useSnackbar();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addProductToCart = async () => {
    try {
      const data = {
        price: product.price,
      };
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/products/${productId}/addToCart/${userId}`,
        data
      );
      setCart(response.data);
      enqueueSnackbar("Product successfully added to cart", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/all-products");
    } catch (error) {
      enqueueSnackbar(
        "Can't add product to cart, you need to sign-in or login",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="product-details-container">
        <div className="flex flex-row justify-between gap-4 px-12 py-10 md:flex-no-wrap">
          <div className="product-image-container md:w-1/2 md:mb-0">
            <div className="rounded-lg h-[650px] bg-gray-200">
              <Carousel pauseOnHover>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-full object-fill rounded-lg"
                    src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                    alt={`Product Image ${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="product-details md:w-1/2 px-4">
            <h2 className="product-name text-6xl font-bold w-full text-black mb-10">
              {product.name}
            </h2>
            <div>
              <p className="font-bold text-black">Description:</p>
              <p className="product-description text-black text-sm mt-2 mb-8">
                {product.description}
              </p>
            </div>
            <div className="product-price flex pb-8 mt-16 mb-4">
              <div className="text-black">
                <span className="price-value text-6xl  font-bold text-black">
                  ${product.price}
                </span>
              </div>
            </div>
            <div className="flex gap-7 mt-10 w-full">
              <button
                onClick={addProductToCart}
                className="add-to-cart-btn flex items-center justify-center w-full p-4 gap-4 rounded-md bg-black text-white font-bold shadow-2xl hover:bg-orange-200 hover:text-black "
              >
                Add to Cart <IoCartOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
