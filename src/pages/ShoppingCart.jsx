import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import ShoppingProductCard from "../components/ShoppingProductCard";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function ShoppingCart() {
  const { enqueueSnackbar } = useSnackbar();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData.name : "";
  const userId = localStorage.getItem("user");
  const currentUser = userId ? JSON.parse(userId).id : null;
  const [shoppingCart, setShoppingCart] = useState([]);
  const [pay, setPay] = useState(null);

  useEffect(() => {
    const fetchUserCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${currentUser}/cart`
        );
        setShoppingCart(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Erreur lors de la récupération du panier", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    };
    fetchUserCartProducts();
  }, [currentUser, enqueueSnackbar]);

  const removeProductFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3456/products/${productId}/cart/${currentUser}`
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

  const payAndgetThefuckOut = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3456/payment/stripe/${currentUser}`
      );
      setPay(response.data.url);
      console.log(response.data.url);
      const paymentUrl = response.data.url;
      window.open(paymentUrl, "blank");
    } catch (error) {
      console.error("Error fetching payment URL:", error);
    }
  };

  const totalProduct = () => {
    if (!Array.isArray(shoppingCart) || shoppingCart.length === 0) {
      return 0;
    }
    return shoppingCart
      .reduce((acc, product) => acc + product.product.price, 0)
      .toFixed(2);
  };

  return (
    <section className="cart-wrapper">
      <div className="cart-header text-5xl font-bold pl-10 mt-16 mb-11 text-gray-900 dark:text-black">
        Shopping Cart de {userName}
        <div className="total-price flex flex-col justify-center items-start">
          <div className="price&pay flex flex-row items-center justify-center gap-3">
            <h1 className="text-4xl font-bold mb-3 mt-9">Total Price</h1>
            <Button
              onClick={() => {
                payAndgetThefuckOut();
              }}
              gradientDuoTone="pinkToOrange"
            >
              Rhalass
            </Button>
          </div>

          <p className="text-3xl font-normal">{totalProduct()}$</p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="product-grid grid grid-cols-4 gap-x-10 gap-y-7 w-screen px-7">
          {shoppingCart && shoppingCart.length > 0 ? (
            shoppingCart.map((product, index) => (
              <ShoppingProductCard
                Products={product}
                removeProductFromCart={removeProductFromCart}
              />
            ))
          ) : (
            <div className="empty-cart flex flex-col justify-center items-center ">
              <p className="no-product-text text-6xl text-black text-center">
                Aucun produit dans le panier
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
