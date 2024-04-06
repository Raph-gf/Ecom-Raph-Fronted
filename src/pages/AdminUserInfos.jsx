import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { useSnackbar } from "notistack";
import AdminUserModal from "../components/AdminUserModal";

function UserInfos() {
  const iconStyles = { fontSize: "10rem" };
  const { enqueueSnackbar } = useSnackbar();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [zipCode, setZipCode] = useState();
  const [Adress, setAdress] = useState();

  const [userinfos, setUserinfos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { userID } = useParams();
  console.log(userID);

  useEffect(() => {
    const infos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/users/${userID}`
        );
        setUserinfos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    infos();
  }, [userID]);

  if (!userinfos) {
    return <ErrorPage />;
  }
  const updateUserInfos = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/users/${userID}/update`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          zipCode: zipCode,
          Adress: Adress,
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
      enqueueSnackbar("User successfully updated", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/users");
    } catch (error) {
      enqueueSnackbar("Failed to update User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3456/users/${userID}/delete`
      );
      setUserinfos(response.data);
      enqueueSnackbar("User successfully deleted", {
        variant: "success",
        autoHideDuration: 2000,
      });
      console.log(response.data);
      navigate("/users");
    } catch (error) {
      enqueueSnackbar("Failed to delete User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };
  return (
    <>
      <section class="pt-16 bg-blueGray-50 flex">
        <div class=" lg:w-4/12 pl-10 ">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full px-4 flex justify-center">
                  <div class="relative">
                    <FaCircleUser style={iconStyles} />
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {userinfos.firstname}
                </h3>
                <h2 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-4">
                  {userinfos.lastname}
                </h2>
                <h4 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-4">
                  {userinfos.Adress}
                </h4>
                <h4 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-4">
                  {userinfos.zipCode}
                </h4>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userinfos.email}
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                      👋 Hi !! I am {userinfos.firstname} nice to meet you
                    </p>
                    <div className="controls flex  justify-center gap-5 mt-3">
                      <button
                        class="font-normal text-orange-500"
                        onClick={() => setShowModal((prevState) => !prevState)}
                      >
                        Edit
                      </button>
                      <button
                        class=" delete-button text-red-500 "
                        onClick={deleteUser}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <section className=" w-screen flex flex-col px-8 lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
              <div className="mx-auto max-w-lg text-center"></div>

              <form
                action="#"
                onSubmit={updateUserInfos}
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
              >
                {/* Input pour le FirstName */}
                <div>
                  <label htmlFor="firstname" className="sr-only">
                    FirstName
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter First Name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                </div>

                {/* Input pour le LastName*/}
                <div>
                  <label htmlFor="LastName" className="sr-only">
                    LastName
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter LastName"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                {/* Input 3 pour l'email */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* Icône pour l'email */}
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Input pour le mot de passe */}
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Input pour le zipCode */}
                <div>
                  <label htmlFor="zipCode" className="sr-only">
                    zipCode
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
                {/* Input pour l'Adresse */}
                <div>
                  <label htmlFor="Adress" className="sr-only">
                    Adress
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter adress"
                      value={Adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </div>
                </div>
                {/* Bouton de soumission */}
                <div className="flex items-center justify-between mt-24">
                  <button
                    type="submit"
                    className=" rounded-lg bg-orange-200 px-5 py-3 text-sm font-medium text-black"
                  >
                    Update profile
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default UserInfos;
