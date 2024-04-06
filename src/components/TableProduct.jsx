import React from "react";

function TableProduct(props) {
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mb-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-black uppercase bg-orange-200">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-orange-100 hover:cursor-pointer">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-black whitespace-nowrap w-96 "
              >
                {props.name}
              </th>

              <td class="px-6 py-4 w-96 text-black">{props.price} $</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableProduct;
