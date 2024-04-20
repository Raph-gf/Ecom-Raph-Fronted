import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import ShoppingProductCard from "../components/ShoppingProductCard";
import { userInfos } from "../context";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function ShoppingCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { userId, username } = userInfos();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [pay, setPay] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
        `http://localhost:3456/products/${productId}/cart/${userId}`
      );

      // Mise à jour du panier en filtrant le produit supprimé
      setShoppingCart((prevCart) =>
        prevCart.filter((product) => product._id !== productId)
      );

      enqueueSnackbar("Produit supprimé avec succès du panier", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Erreur lors de la suppression du produit du panier", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleAddQty = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3456/products/${userId}/updateProductQuantity/add`,
        {
          productId: "660fc404be865742a050a1ff",
        }
      );
      setQuantity(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product quantity:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3456/payment/stripe/${userId}`
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
      .reduce((acc, product) => acc + product.product.price * quantity, 0)
      .toFixed(2);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <section className="cart-wrapper mx-auto ">
      <div className="cart-header text-3xl font-bold pl-10 mt-16 mb-8 text-gray-900 dark:text-black ">
        Shopping Cart de {username}
      </div>
      <div className="border border-b-1"></div>
      <div className="items-wrapper flex  mt-5">
        <div className="">
          {Array.isArray(shoppingCart) && shoppingCart.length > 0 ? (
            shoppingCart.map((product, index) => (
              <ShoppingProductCard
                key={index}
                Products={product}
                RemoveProductFromCart={removeProductFromCart}
                Quantity={product.quantity}
                incrementQuantity={() => incrementQuantity(product._id)}
                decrementQuantity={() => decrementQuantity(product._id)}
                setQuantity={(newQuantity) =>
                  handleSetQuantity(product._id, newQuantity)
                }
              />
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
