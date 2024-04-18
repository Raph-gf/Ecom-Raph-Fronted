import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom"; // Import de Link depuis React Router

function ShoppingProductCard({
  Products,
  removeProductFromCart,
  handleAddQty,
}) {
  const [quantity, setQuantity] = useState(Products.quantity);
  const iconStyles = { color: "black", fontSize: "1.3em" };

  const handleRemove = () => {
    removeProductFromCart(Products._id);
  };

  const handleAdd = () => {
    handleAddQty(Products.product._id);
  };

  return (
    <div className="product-card max-w-sm bg-white rounded-lg shadow-md">
      <img
        className="product-image rounded-t-2xl w-full mb-3"
        src={`http://localhost:3456/${Products.product.images[0]}`}
        alt="Product Image"
      />
      <div className="product-details px-3 pb-5">
        {/* Utilisation de Link pour rendre le nom du produit cliquable */}
        <Link to={`/products/${Products.product._id}`}>
          <h5 className="product-name text-2xl font-bold text-gray-900 dark:text-black mb-7">
            {Products.product.name}
          </h5>
        </Link>

        <div className="product-quantity flex items-center">
          <button onClick={handleAddQty}>++</button>
          <h5 className="quantity-label text-md font-bold text-gray-900 dark:text-black">
            Qty: {quantity}
          </h5>
        </div>
        <div className="product-price flex items-center justify-between mt-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-black">
            {Products.product.price}$
          </span>
          <button
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
