import {
  Button,
  Label,
  Modal,
  TextInput,
  FileInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { GoPlus } from "react-icons/go";
import { userInfos } from "../context";

function CreateUserModal() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const { token } = userInfos();

  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/products/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setName("");
      setPrice("");
      setDescription("");
      setImages([]);
      enqueueSnackbar("Product successfully created", {
        variant: "success",
        autoHideDuration: 2000,
        onClose: () => {
          window.location.reload();
        },
      });
      setOpenModal(false);
    } catch (error) {
      enqueueSnackbar("Failed to create Product", {
        variant: "error",
        autoHideDuration: 2000,
        onClose: () => {
          window.location.reload();
        },
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="btn flex gap-1  hover:text-orange-400 ">
        <GoPlus className="" fontSize="1.2rem" />
        <button className="bg-none text-xs " onClick={() => setOpenModal(true)}>
          Create Product
        </button>
      </div>
      <Modal
        show={openModal}
        size="xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form
            action="#"
            id="createForm"
            encType="multipart/form-data"
            onSubmit={createProduct}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Product
              </h3>
              <div>
                <Label htmlFor="Name" value="Name" />
                <TextInput
                  id="Name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="Price" value="Price" />
                <TextInput
                  id="Price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
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
                  required
                  rows={4}
                />
              </div>
              <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="file" />
                </div>
                <FileInput id="file" onChange={handleFileChange} multiple />
              </div>

              <div className="w-full">
                <Button type="submit">Create Product</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateUserModal;
