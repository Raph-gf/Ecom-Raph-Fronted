import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { userInfos } from "../context";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

function ShoppingCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { userId, username } = userInfos();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [pay, setPay] = useState(null);

  useEffect(() => {
    const fetchUserCartProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/${userId}/cart`
        );
        setShoppingCart(response.data.Products);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserCartProducts();
  }, [userId, enqueueSnackbar]);

  const removeProductFromCart = async (productId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/products/${productId}/cart/${userId}`
      );

      // Mise à jour du panier en filtrant le produit supprimé
      setShoppingCart((prevCart) =>
        prevCart.filter((product) => product._id !== productId)
      );

      enqueueSnackbar("Produit supprimé avec succès du panier", {
        variant: "success",
        autoHideDuration: 2000,
      });
      console.log(productId);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Erreur lors de la suppression du produit du panier", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handlePayment = async () => {
    try {
      const lineItems = shoppingCart.map((product) => ({
        productId: product.product._id,
        quantity: product.quantity,
      }));
      console.log(lineItems);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/payment/stripe/${userId}`,
        { lineItems }
      );
      setPay(response.data.url);
      console.log(response.data.url);
      const paymentUrl = response.data.url;
      window.open(paymentUrl, "_blank");
      enqueueSnackbar("Achat effectuer avec succès", {
        variant: "success",
        autoHideDuration: 4000,
      });
    } catch (error) {
      enqueueSnackbar("Erreur lors du paiement", {
        variant: "error",
        autoHideDuration: 4000,
      });
      console.error("Error fetching payment URL:", error);
    }
  };

  const totalProduct = () => {
    if (!Array.isArray(shoppingCart) || shoppingCart.length === 0) {
      return 0;
    }
    return shoppingCart
      .reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0
      )
      .toFixed(2);
  };

  const incrementQuantity = (productId) => {
    setShoppingCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setShoppingCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <section className="cart-wrapper mx-auto ">
      <div className="cart-header text-3xl font-bold pl-10 mt-16 mb-8 text-gray-900 dark:text-black ">
        Shopping Cart de {username}
        <p className="items-incart text-gray-600 text-sm mt-2 ml">
          il y a actuellement{" "}
          <span className="text-orange-500">{shoppingCart.length}</span>{" "}
          elements dans votre panier
        </p>
      </div>
      <div className="border border-b-1"></div>
      <div className="items-wrapper flex w-screen mt-5">
        <div className="cart-content w-screen">
          {Array.isArray(shoppingCart) && shoppingCart.length > 0 ? (
            shoppingCart.map((product, index) => (
              <div
                key={product.product._id}
                className="card p-4 w-full flex flex-row items-center justify-between shadow-xl text-black "
              >
                <div className="left-content flex items-center">
                  <div className="items-image mr-3">
                    <img
                      className="px-2 pt-2 pb-3 rounded-2xl h-[100px]"
                      src={`${import.meta.env.VITE_SERVER_URL}/${
                        product.product.images[0]
                      }`}
                      alt="product image"
                    />
                  </div>
                  <div className="items-text flex flex-col">
                    <h1 className="items-title text-lg font-bold">
                      {product.product.name}
                    </h1>
                    <div className="items-description text-xs mr-4 w-[750px]">
                      {product.product.description
                        .split(" ")
                        .slice(0, 30)
                        .join(" ")}
                    </div>
                  </div>
                </div>
                <div className="right-content flex items-center gap-5">
                  <div className="items-quantity justify-center flex">
                    <button onClick={() => incrementQuantity(product._id)}>
                      +
                    </button>
                    <div className="quantity-display">{product.quantity}</div>
                    <button onClick={() => decrementQuantity(product._id)}>
                      -
                    </button>
                  </div>
                  <div className="items-price font-extrabold">
                    $ {product.product.price * product.quantity}
                  </div>
                  <div className="items-button text-lg">
                    <button
                      className="items-delete hover:text-red-600"
                      onClick={() => removeProductFromCart(product._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart flex flex-col justify-center items-center ">
              <p className="no-product-text text-6xl text-black text-center">
                Aucun produit dans le panier
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mx-10 mb-4 p-6 ">
            <div className="flex items-center gap-2">
              <FaLongArrowAltLeft style={{ color: "orange" }} />
              <Link to="/all-products">
                <span className="text-md font-medium text-orange-400">
                  Continue Shopping
                </span>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg font-medium text-gray-400 mr-3">
                Subtotal:
              </span>
              <span className="text-xl font-bold text-gray-800 ">
                ${totalProduct()}
              </span>
            </div>
            <button
              onClick={handlePayment}
              className="buy-btn flex items-center gap-3 bg-orange-300 p-2 rounded-lg text-black text-md font-semibold"
            >
              <FaCartShopping />
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
