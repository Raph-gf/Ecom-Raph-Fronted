import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { GoPlus } from "react-icons/go";

function CreateUserModal() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const createProduct = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3456/products/create-product`,
        {
          name: name,
          price: price,
          image: image,
          description: description,
        }
      );
      console.log(response.data);
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      enqueueSnackbar("Product successfully created", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setOpenModal(false);
    } catch (error) {
      enqueueSnackbar("Failed to create User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="btn flex gap-1 hover:text-orange-400 ">
        <GoPlus fontSize="1.2rem" />
        <button className="bg-none text-xs" onClick={() => setOpenModal(true)}>
          Create user
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
            onSubmit={(e) => {
              e.preventDefault();
              createProduct();
            }}
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
              <div>
                <Label htmlFor="Description" value="Description" />
                <TextInput
                  id="Description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image" value="image" />
                <TextInput
                  type="text"
                  id="image"
                  placeholder="Link to image"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                />
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
