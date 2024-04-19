import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import ShoppingProductCard from "../components/ShoppingProductCard";
import { userInfos } from "../context";

function ShoppingCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = userInfos();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pay, setPay] = useState(null);

  useEffect(() => {
    const fetchUserCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${userId}/cart`
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
      .reduce((acc, product) => acc + product.product.price, 0)
      .toFixed(2);
  };

  return (
    <section className="cart-wrapper">
      {/* <div className="cart-header text-5xl font-bold pl-10 mt-16 mb-11 text-gray-900 dark:text-black">
        Shopping Cart de {userName}
        <div className="total-price flex flex-col justify-center items-start">
          <div className="price&pay flex flex-row items-center justify-center gap-3">
            <h1 className="text-4xl font-bold mb-3 mt-9">Total Price</h1>
          </div>

          <p className="text-3xl font-normal mt-2">{totalProduct()}$</p>
          
        </div>
      </div> */}
      <button
        className="buy-btn flex flex-row text-lg items-center gap-2 bg-orange-200 p-3 rounded-xl mt-5 "
        onClick={() => {
          handlePayment();
        }}
      >
        <p>Buy</p>
      </button>
      <div className="items-wrapper">
        <div className="">
          {Array.isArray(shoppingCart) && shoppingCart.length > 0 ? (
            shoppingCart.map((product, index) => (
              // <Link to={`/products/${product._id}`} key={index}>
              <ShoppingProductCard
                key={index}
                Products={product}
                removeProductFromCart={removeProductFromCart}
                handleAddQty={handleAddQty}
              />
              // </Link>
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
