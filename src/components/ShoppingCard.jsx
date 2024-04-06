import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function ShoppingCard(product) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md shadow-slate-200">
      <img
        className="pb-4 p-2 rounded-2xl w-full"
        src={product.image}
        alt="product image"
      />

      <div className="px-3 pb-5">
        <a href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black mb-7 pl-1">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              className="w-7 h-7 text-orange-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span className="text-black text-sm font-semibold bg-orange-200 rounded-lg px-1.5 py-0.5 dark:text-black ms-3">
            5.0
          </span>
        </div>
        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-black mb-7 pl-1">
          quant: <button className="quantity">-</button>
          <span className="quantity text-orange-400"> {product.quantity}</span>
          <button className="+">+</button>
        </h5>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-black">
            {product.price}$
          </span>
          <button
            href="#"
            className="text-black flex items-center gap-3 bg-orange-200 hover:scale-110 duration-200 font-medium rounded-lg text-sm px-2 py-2 text-center"
            onClick={product.deleteFromCart}
          >
            Delete from Cart
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCard;
