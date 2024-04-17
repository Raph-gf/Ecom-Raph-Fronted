import React from "react";

function TableProduct(props) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-orange-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-orange-100 hover:cursor-pointer">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap w-96 "
              >
                {props.name}
              </th>

              <td className="px-6 py-4 w-96 text-black">{props.price} $</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableProduct;
