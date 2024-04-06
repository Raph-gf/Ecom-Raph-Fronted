import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div className="users flex gap-10 justify-center items-center text-3xl px-10 mb-10">
        <h1>Users</h1>
        <Link to="/users/create">
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create User
          </button>
        </Link>
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
