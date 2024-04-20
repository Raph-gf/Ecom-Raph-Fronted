import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function ShoppingProductCard({
  Products,
  RemoveProductFromCart,
  Quantity,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
}) {
  console.log(Products);

  const iconStyles = { color: "black", fontSize: "1.3em" };

  const [productQuantity, setProductQuantity] = useState(Quantity);

  useEffect(() => {
    setProductQuantity(Quantity);
  }, [Quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setProductQuantity(newQuantity);
    setQuantity(newQuantity);
  };

  const handleRemove = () => {
    RemoveProductFromCart(Products._id);
  };

  return (
    <>
      <div className="card p-4 w-full flex flex-row items-center justify-between shadow-xl text-black ">
        <div className="left-content flex items-center">
          <div className="items-image mr-3">
            <img
              className="px-2 pt-2 pb-3 rounded-2xl h-[100px]"
              src={`${import.meta.env.VITE_SERVER_URL}/${
                Products.product.images[0]
              }`}
              alt="product image"
            />
          </div>
          <div className="items-text flex flex-col">
            <h1 className="items-title text-lg font-bold">
              {Products.product.name}
            </h1>
            <div className="items-description text-xs mr-4 w-[750px]">
              {Products.product.description.split(" ").slice(0, 30).join(" ")}
            </div>
          </div>
        </div>
        <div className="right-content flex items-center gap-5">
          <div className="items-quantity justify-center flex">
            <button onClick={incrementQuantity}>+</button>
            <input
              type="text"
              className="rounded-md border-2 h-6 p-3 w-32"
              value={productQuantity}
              onChange={handleQuantityChange}
            />
            <button onClick={decrementQuantity}>-</button>
          </div>
          <div className="items-price">
            $ {Products.product.price * productQuantity}
          </div>
          <div className="items-button">
            <button
              className="items-delete hover:text-red-600"
              onClick={handleRemove}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingProductCard;
