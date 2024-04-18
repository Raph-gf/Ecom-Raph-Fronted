import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

function AdminEditUserModal() {
  const [openModal, setOpenModal] = useState(false);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [zipCode, setZipCode] = useState();
  const [Adress, setAddress] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { userID } = useParams();
  console.log(userID);

  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);

  useEffect(() => {
    const userData = async () => {
      const response = await axios.get(
        `http://localhost:3456/admin/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedUser = response.data;
      console.log(fetchedUser);
      setFirstname(fetchedUser.firstname);
      setLastname(fetchedUser.lastname);
      setEmail(fetchedUser.email);
      setZipCode(fetchedUser.zipCode);
      setAddress(fetchedUser.Adress);
    };
    userData();
  }, []);

  const updateUserInfos = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/admin/user/${userID}/update`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          zipCode: zipCode,
          Adress: Adress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setFirstname("");
      setLastname("");
      setEmail("");
      setZipCode("");
      setAddress("");
      setOpenModal(false);
      enqueueSnackbar("User successfully updated", {
        variant: "success",
        autoHideDuration: 2500,
      });
      window.location.reload();
    } catch (error) {
      enqueueSnackbar("Failed to update User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Edit</Button>
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
              updateUserInfos();
            }}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit user informations
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstname" value="First Name" />
                </div>
                <TextInput
                  id="firstname"
                  placeholder="enter first name"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastname" value="Last Name" />
                </div>
                <TextInput
                  id="lastname"
                  placeholder="enter last name"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="zipCode" value="Zip Code" />
                </div>
                <TextInput
                  id="zipCode"
                  placeholder="enter zip code"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <TextInput
                  id="address"
                  placeholder="enter adress"
                  value={Adress}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="w-full">
                <Button type="submit">Update User</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AdminEditUserModal;
