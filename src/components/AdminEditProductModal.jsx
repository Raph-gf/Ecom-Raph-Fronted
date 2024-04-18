import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FileInput,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
console.log(token);

function AdminEditProductModal() {
  const [product, setProduct] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [images, setImages] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { productID } = useParams();
  console.log(productID);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  useEffect(() => {
    const productData = async () => {
      const response = await axios.get(
        `http://localhost:3456/admin/products/${productID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedProduct = response.data;

      setProduct(fetchedProduct);
      console.log(fetchedProduct);
      setName(fetchedProduct.name);
      setPrice(fetchedProduct.price);
      setDescription(fetchedProduct.description);
      setImages(fetchedProduct.images);
    };
    productData();
  }, []);

  const updateProductInfos = async () => {
    try {
      const formData = new FormData();
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      // Mettre à jour le produit avec les nouvelles informations
      const updateResponse = await axios.put(
        `http://localhost:3456/admin/products/update-product/${productID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Assurez-vous d'ajouter ce header pour FormData
          },
        }
      );
      console.log(token);

      // Mettre à jour l'état du produit après la mise à jour
      setProduct(updateResponse.data);
      setPrice(updateResponse.data.price);
      setName(updateResponse.data.name);
      setDescription(updateResponse.data.description);
      setImages(updateResponse.data.images);
      enqueueSnackbar("Product successfully updated", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setOpenModal(false);
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
        size="lg"
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
                <div id="fileUpload" className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor="file" />
                  </div>
                  <FileInput id="file" onChange={handleFileChange} multiple />
                </div>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Product description" />
                </div>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
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
