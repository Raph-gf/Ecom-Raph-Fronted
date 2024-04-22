import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useSnackbar } from "notistack";
import AdminEditProductModal from "../components/AdminEditProductModal";
import { Carousel } from "flowbite-react";
import { SiReactivex } from "react-icons/si";
import { userInfos } from "../context";
import DeleteProductPopup from "../components/DeleteProductPopupModal";

function ProductInfos() {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { userId, token } = userInfos();

  const { productID } = useParams();

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/${productID}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductInfo();
  }, [productID]);

  if (!product) {
    return <ErrorPage />;
  }

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3456/admin/products/delete-product/${productID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data);
      console.log(response.data);
      enqueueSnackbar("Product successfully deleted", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/admin/all-products");
    } catch (error) {
      enqueueSnackbar("Failed to delete Product", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="product-info-container">
        <div className="flex flex-row justify-between gap-4 px-12 py-10 md:flex-no-wrap">
          {/* Section de l'image du produit */}
          <div className="product-image-container md:w-1/2 md:mb-0">
            <div className="rounded-lg h-[700px] bg-gray-200">
              <Carousel pauseOnHover>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-full object-fill rounded-lg"
                    src={`http://localhost:3456/${image}`}
                    alt={`Product Image ${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>
          </div>

          {/* Section des détails du produit */}
          <div className="product-details md:w-1/2 px-4">
            <div className="website-name flex items-center gap-3 text-orange-300 pt-9 pb-6">
              ECOM
              <div className="icon">
                <SiReactivex />
              </div>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                RAPH
              </span>
            </div>
            <h2 className="product-name text-6xl font-bold w-full text-black mb-10">
              {product.name}
            </h2>
            <div>
              <p className="font-bold text-black">Description:</p>
              <p className="product-description text-black text-sm mt-2 mb-8">
                {product.description}
              </p>
            </div>
            <div className="product-price flex pb-8 mb-4">
              <div className="text-black">
                <span className="price-value text-5xl font-bold text-black">
                  ${product.price}
                </span>
              </div>
            </div>

            <div className="btn-wrapper flex gap-3">
              <button className="btn-delete-product">
                <DeleteProductPopup
                  className="rounded-xl bg-red-500 hover:bg-red-600"
                  deleteProduct={deleteProduct}
                />
              </button>
              <button className="btn-edit-product rounded-xl bg-orange-200">
                <AdminEditProductModal />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfos;
