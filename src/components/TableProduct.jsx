import React from "react";

function TableProduct(props) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-orange-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-orange-100 hover:cursor-pointer text-center">
              <td class="w-4 p-4">
                <img
                  className="px-2 pt-2 pb-3 rounded-2xl h-[100px]"
                  src={`${import.meta.env.VITE_SERVER_URL}/${props.image}`}
                  alt="product image"
                />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap w-96 text-center "
              >
                {props.name}
              </th>

              <td className="px-6 py-4 w-96 text-center text-black">
                {props.price} $
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableProduct;
