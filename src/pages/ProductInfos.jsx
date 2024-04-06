import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useSnackbar } from "notistack";

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
            <button
              onClick={() => setShowmodal((prevState) => !prevState)}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button
              onClick={deleteProduct}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        {showmodal && (
          <section className=" w-screen flex flex-col px-8 lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
              <div className="mx-auto max-w-lg text-center">
                <h1 className="title form">Edit Product</h1>
              </div>

              <form
                action="#"
                onSubmit={updateProductInfos}
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
              >
                {/* Input pour le FirstName */}
                <div>
                  <label htmlFor="firstname" className="sr-only">
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter link to image"
                      value={images}
                      onChange={(e) => setImages(e.target.value)}
                    />
                  </div>
                </div>

                {/* Input pour le LastName*/}
                <div>
                  <label htmlFor="LastName" className="sr-only">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Input 3 pour l'email */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                {/* Input pour le mot de passe */}
                <div>
                  <label htmlFor="description" className="sr-only">
                    Description
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {/* Bouton de soumission */}
                  <div className="flex items-center justify-between mt-10">
                    <button
                      type="submit"
                      className=" rounded-lg bg-orange-200 px-5 py-3 text-sm font-medium text-black"
                    >
                      Update product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default ProductInfos;
