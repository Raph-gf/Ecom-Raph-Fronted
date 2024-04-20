import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal";
import { userInfos } from "../context";
import TableUser from "../components/TableUser";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { token } = userInfos();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/user/allusers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Users", error);
      }
    };
    getAllUsers();
  }, [token]);

  return (
    <>
      <div className="users-container flex items-center gap-10 justify-start text-3xl pb-3 px-12 mt-16 mb-10">
        <h1>Users</h1>
        <CreateUserModal />
      </div>
      {Array.isArray(users) &&
        users.map((user, index) => (
          <Link to={`/users/${user._id}`} key={index}>
            <TableUser
              key={index}
              firstname={user.firstname}
              lastname={user.lastname}
              email={user.email}
            />
          </Link>
        ))}
    </>
  );
}

export default AdminUsers;
