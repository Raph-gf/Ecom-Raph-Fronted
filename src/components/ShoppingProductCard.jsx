import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function ShoppingProductCard({
  Products,
  removeProductFromCart,
  handleAddQty,
}) {
  console.log(Products);
  const [quantity, setQuantity] = useState(Products.quantity);
  const iconStyles = { color: "black", fontSize: "1.3em" };

  const handleRemove = () => {
    removeProductFromCart(Products._id);
  };

  const handleAdd = () => {
    handleAddQty(Products.product._id);
  };

  return (
    <>
      <div className="container mx-10 bg-grey-200 shadow-xl rounded-md mb-2">
        <div className="card p-4 flex flex-row items-center justify-between text-black ">
          <div className="left-content flex items-center">
            <div className="items-image mr-3">
              <img
                className="px-2 pt-2 pb-3 rounded-2xl h-[100px] "
                src={`http://localhost:3456/${Products.product.images[0]}`}
                alt="produc t image"
              />
            </div>
            <div className="items-text flex flex-col">
              <h1 className="items-title">{Products.product.name}</h1>
              <div className="items-description text-xs mr-4 w-[750px]">
                {Products.product.description.split(" ").slice(0, 30).join(" ")}
              </div>
            </div>
          </div>
          <div className="right-content flex items-center gap-5">
            <div className="items-quantity justify-center flex">
              <input
                type="number"
                className="rounded-md border-2 h-6 p-3 w-32"
              />
            </div>
            <div className="items-price">$ {Products.product.price}</div>
            <div className="items-button">
              <button className="items-delete" onClick={handleRemove}>
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingProductCard;
