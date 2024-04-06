import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { closeSnackbar, useSnackbar } from "notistack";
import ShoppingCard from "../components/ShoppingCard";

function ShoppingCart() {
  const { enqueueSnackbar } = useSnackbar();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userProfile = userData ? userData.firstname : "";
  const userId = localStorage.getItem("user");
  const currentUser = JSON.parse(userId)._id;
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const fetchUserCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${currentUser}/cart`
        );
        setShoppingCart(response.data.Cart.products);
        console.log(response.data);
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
  console.log(shoppingCart);

  // Fonction pour supprimer un produit du panier
  const removeProductFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3456/products/${productId}/cart/${currentUser}`
      );

      console.log(productId);
      const updateCart = shoppingCart.filter(
        (product) => product._id !== productId
      );
      setShoppingCart(updateCart);
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

  const totalProduct = () => {
    if (shoppingCart.length === 0) {
      return 0;
    }
    return shoppingCart
      .reduce((acc, product) => acc + product.price, 0)
      .toFixed(2);
  };

  return (
    <section className="wrapper">
      <div className="text-5xl font-bold pl-10 mt-16 mb-11 text-gray-900 dark:text-black">
        Shopping Cart de {userProfile}
        <div className="totalPrice flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold mb-3 mt-9">Total Price</h1>
          <p className="text-3xl font-normal">{totalProduct()}$</p>{" "}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-7 w-screen px-7">
        {shoppingCart.length > 0 ? (
          shoppingCart.map((product, index) => (
            <ShoppingCard
              key={index}
              image={product.images}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              description={product.description}
              deleteFromCart={() => removeProductFromCart(product._id)}
            />
          ))
        ) : (
          <div className="erreur flex justify-center items-center">
            <p className="text-6xl text-black pt-28 flex justify-center items-center text-center">
              Aucun produit dans le panier
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShoppingCart;
