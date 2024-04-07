import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

function CreateUserModal() {
  const [openModal, setOpenModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [Adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const createUser = async () => {
    try {
      const response = await axios.post(`http://localhost:3456/users/create`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        zipCode: zipCode,
        Adress: Adress,
      });
      console.log(response.data);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setZipCode("");
      setAdress("");
      enqueueSnackbar("User successfully created", {
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
      <Button onClick={() => setOpenModal(true)}>Create user</Button>
      <Modal
        show={openModal}
        size="2xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              createUser();
            }}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create User
              </h3>
              <div>
                <Label htmlFor="firstname" value="First Name" />
                <TextInput
                  id="firstname"
                  placeholder="Enter first name"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastname" value="Last Name" />
                <TextInput
                  id="lastname"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode" value="Zip Code" />
                <TextInput
                  id="zipCode"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address" value="Address" />
                <TextInput
                  id="address"
                  placeholder="Enter address"
                  value={Adress}
                  onChange={(event) => setAdress(event.target.value)}
                />
              </div>
              <div className="w-full">
                <Button type="submit">Create User</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateUserModal;
