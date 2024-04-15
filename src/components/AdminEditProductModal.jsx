import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function AdminEditProductModal() {
  const [product, setProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState();
  const [images, setImages] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { productID } = useParams();
  console.log(productID);

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
      <button
        className="bg-orange-200 rounded-3xl px-6 py-3 font-bold hover:bg-none "
        onClick={() => setOpenModal(true)}
      >
        Edit
      </button>
      <Modal
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              updateProductInfos();
            }}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit product informations
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="enter name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="price" />
                </div>
                <TextInput
                  id="price"
                  placeholder="enter price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="images" value="images" />
                </div>
                <TextInput
                  id="images"
                  placeholder="enter link to images"
                  value={images}
                  onChange={(event) => setImages(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="description" />
                </div>
                <TextInput
                  id="description"
                  placeholder="enter description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="w-full">
                <Button type="submit">Update Product</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminEditProductModal;
