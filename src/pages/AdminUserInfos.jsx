import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useSnackbar } from "notistack";
import { Card } from "flowbite-react";
import { Avatar } from "flowbite-react";
import AdminEditUserModal from "../components/AdminEditUserModal";
import { userInfos } from "../context";
import DeleteUserPopupModal from "../components/DeleteUserPopupModal";

function UserInfos() {
  const { enqueueSnackbar } = useSnackbar();
  const [userinfos, setUserinfos] = useState(null);
  const navigate = useNavigate();
  const { token } = userInfos();
  const { userID } = useParams();
  console.log(userID);

  useEffect(() => {
    const fetchUserInfos = async () => {
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
      } catch (error) {
        console.error(error);
        setUserinfos(null);
      }
    };
    fetchUserInfos();
  }, [userID, token]);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3456/admin/user/${userID}/delete`,
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
      navigate("/users");
    } catch (error) {
      enqueueSnackbar("Failed to delete User", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.error(error);
    }
  };

  if (!userinfos) {
    return <ErrorPage />;
  }

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
            <DeleteUserPopupModal
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
