import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3456/users/create`, {
        firstname,
        lastname,
        email,
        password,
        zipCode,
        address,
      });
      console.log(response.data);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setZipCode("");
      setAddress("");
      enqueueSnackbar("User successfully created", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/users");
    } catch (error) {
      enqueueSnackbar("Failed to create User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <section className="flex flex-wrap px-8 items-center lg:h-screen">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-8xl font-bold sm:text-3xl">Create User Form</h1>
        </div>

        <form onSubmit={createUser} className="mx-auto mt-8 max-w-md space-y-4">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Personal Information
            </h3>

            <div className="flex flex-col">
              <label htmlFor="firstname" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="input-field"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastname" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="input-field"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="zipCode" className="sr-only">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                className="input-field"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="input-field"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-500">No account?</p>
              <button type="submit" className="create-btn">
                Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateUser;
