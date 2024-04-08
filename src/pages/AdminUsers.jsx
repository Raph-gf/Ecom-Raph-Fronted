import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3456/users/allusers"
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Users", error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div className="users flex flex-col gap-10 justify-center items-center text-3xl px-10 mb-10">
        <h1>Users</h1>
        <CreateUserModal />
      </div>
      {users.map((user, index) => (
        <Link to={`/users/${user._id}`} key={index}>
          <Table
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
