import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Card, Dropdown, Button } from "flowbite-react";
import { Avatar } from "flowbite-react";
import AdminEditUserModal from "../components/AdminUserModal";
import DeletePopup from "../components/DeletePopupModal";

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

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);

  const { userID } = useParams();
  console.log(userID);

  useEffect(() => {
    const infos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/admin/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
        `http://localhost:3456/users/${userID}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      <Card className="">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Avatar />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userinfos.firstname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userinfos.lastname}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userinfos.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userinfos.zipCode}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userinfos.Adress}
          </span>
          <p className="mb-4 text-sm leading-relaxed text-blueGray-700">
            👋 Hi !! I am {userinfos.firstname} nice to meet you
          </p>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <AdminEditUserModal />
            <DeletePopup
              deleteUser={deleteUser}
              firstname={userinfos.firstname}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default UserInfos;
