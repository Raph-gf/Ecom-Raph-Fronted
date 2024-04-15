import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";

function DeletePopup({ deleteUser, firstname }) {
  const [openModal, setOpenModal] = useState(false);
  const { userID } = useParams();
  console.log(userID);

  return (
    <>
      <button
        className="bg-orange-200 rounded-3xl px-6 py-3 font-bold hover:bg-none "
        onClick={() => setOpenModal(true)}
      >
        Delete
      </button>
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
              Are you sure you want to delete {firstname.firstname}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteUser(), setOpenModal(false);
                }}
              >
                Yes im sure
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
