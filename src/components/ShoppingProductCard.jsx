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
      <div className="container mx-10 bg-black  w-screen">
        <div className="card-container flex w-full ">
          <div className="card w-full p-4 flex flex-row items-center justify-evenly text-white ">
            <div className="left-items-sec">
              <div className="items-infos flex flex-row items-center gap-4">
                <div className="items-image">
                  <img
                    className="px-2 pt-2 pb-3 rounded-2xl h-[100px] w-full"
                    src={`http://localhost:3456/${Products.product.images[0]}`}
                    alt="produc t image"
                  />
                </div>
                <div className="items-text flex flex-col">
                  <h1 className="items-title">{Products.product.name}</h1>
                  <div className="items-description text-xs mr-4">
                    {Products.product.description
                      .split(" ")
                      .slice(0, 30)
                      .join(" ")}
                  </div>
                </div>
              </div>
            </div>
            <div className="items-number-infos flex flex-row gap-10 items-center">
              <div className="items-quantity">
                <input type="number" />
              </div>
              <div className="items-price">$ {Products.product.price}</div>
              <div className="items-button">
                <MdDeleteForever />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default ShoppingProductCard;
