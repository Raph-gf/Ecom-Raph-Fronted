import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const createProduct = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products/create-product`,
        {
          image: images,
          name: name,
          price: price,
          description: description,
        }
      );
      setUserinfos(response.data);
      console.log(response.data);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setZipCode("");
      setAdress("");
      enqueueSnackbar("Product successfully created", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/users");
    } catch (error) {
      enqueueSnackbar("Failed to create Product", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <section className=" w-screen flex flex-col px-8 lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-8xl font-bold sm:text-3xl">
              Create Product Form
            </h1>
          </div>

          <form
            action="#"
            onSubmit={createProduct}
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
                  Create product
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateProduct;
