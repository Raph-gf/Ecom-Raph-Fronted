import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";

function DeletePopup({ deleteProduct }) {
  const [openModal, setOpenModal] = useState(false);
  const { productID } = useParams();
  console.log(productID);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Delete</Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body className=" ">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteProduct(); // Appel correct de deleteProduct
                  setOpenModal(false);
                }}
              >
                Yes I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeletePopup;
