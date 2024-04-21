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
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { token } = userInfos();
  const { userID } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
        setUserInfo(null);
      }
    };
    fetchUserInfo();
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
      setUserInfo(response.data);
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

  if (!userInfo) {
    return <ErrorPage />;
  }

  return (
    <>
      <Card className="user-info-card">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="user-info-content flex flex-col items-center pb-10">
          <Avatar />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userInfo.firstname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.lastname}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.zipCode}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.address}
          </span>
          <p className="mb-4 text-sm leading-relaxed text-blueGray-700">
            👋 Hi !! I am {userInfo.firstname} nice to meet you
          </p>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <AdminEditUserModal />
            <DeleteUserPopupModal
              deleteUser={deleteUser}
              firstname={userInfo.firstname}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default UserInfos;
