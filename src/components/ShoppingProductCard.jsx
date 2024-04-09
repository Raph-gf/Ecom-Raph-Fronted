import React from "react";
import { MdDeleteForever } from "react-icons/md";

function ShoppingProductCard({ Products, userId, removeProductFromCart }) {
  const handleRemove = () => {
    removeProductFromCart(Products.product._id);
  };

  return (
    <div className="product-card max-w-sm bg-white rounded-lg shadow-md">
      <img
        className="product-image rounded-t-2xl w-full mb-3"
        src={Products.product.images}
        alt="Product Image"
      />
      <div className="product-details px-3 pb-5">
        <a href="#">
          <h5 className="product-name text-2xl font-bold text-gray-900 dark:text-black mb-7">
            {Products.product.name}
          </h5>
        </a>
        <div className="product-quantity flex items-center">
          <h5 className="quantity-label text-md font-bold text-gray-900 dark:text-black">
            Qty: {Products.product.quantity}
          </h5>
        </div>
        <div className="product-price flex items-center justify-between mt-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-black">
            {Products.product.price}$
          </span>
          <button
            href="#"
            className="delete-btn flex items-center gap-3 bg-orange-200 hover:scale-110 duration-200 font-medium rounded-lg text-sm px-2 py-2 mr-9"
            onClick={handleRemove}
          >
            Delete
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductCard;
