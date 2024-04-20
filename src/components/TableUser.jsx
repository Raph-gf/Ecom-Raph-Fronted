import React from "react";
import { FaCircleUser } from "react-icons/fa6";

function TableUser(props) {
  const iconStyles = { fontSize: "1.5em" };
  return (
    <>
      <div class="relative overflow-x-auto  shadow-md sm:rounded-lg mx-10 mb-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead class="text-xs text-black uppercase bg-orange-100">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center"></div>
              </th>
              <th scope="col" class="px-6 py-3">
                First name
              </th>
              <th scope="col" class="px-6 py-3">
                Last name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-orange-100 hover:cursor-pointer ">
              <td class="w-4 p-4">
                <FaCircleUser style={iconStyles} />
              </td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-black whitespace-nowrap w-96"
              >
                {props.firstname}
              </th>
              <td class="px-6 py-4 text-black">{props.lastname}</td>
              <td class="px-6 py-4 text-black w-96">{props.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableUser;
