import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useSnackbar } from "notistack";
import DeletePopup from "../components/DeletePopupProductModal";

function ProductInfos() {
  const [product, setProduct] = useState(null);
  const [showmodal, setShowmodal] = useState(null);
  const [images, setImages] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { productID } = useParams();
  console.log(productID);

  useEffect(() => {
    const infos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${productID}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    infos();
  }, [productID]);
  if (!product) {
    return <ErrorPage />;
  }

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3456/products/delete-product/${productID}`
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

  const updateProductInfos = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/products/update-product/${productID}`,
        {
          image: images,
          name: name,
          price: price,
          description: description,
        }
      );
      setProduct(response.data);
      console.log(response.data);
      setImages("");
      setName("");
      setPrice("");
      setDescription("");

      enqueueSnackbar("Product successfully updated", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/admin/all-products");
    } catch (error) {
      enqueueSnackbar("Failed to update Product", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <section class="pt-16 bg-blueGray-50 flex">
        <div class="max-w-sm rounded-lg shadow dark:bg-orange-200 dark:border-gray-700 ml-16">
          <img class="rounded-t-lg" src={product.images} alt="" />

          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
            </a>
            <p class="mb-3 font-normal text-black">{product.price} $</p>
            <p class="mb-3 font-normal text-black">{product.description}</p>
            <button className="deleteProduct">
              <DeletePopup deleteProduct={deleteProduct} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductInfos;
