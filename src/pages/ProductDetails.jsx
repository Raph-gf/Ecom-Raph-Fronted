import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { IoCartOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { SiReactivex } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

import { Carousel } from "flowbite-react";

function ProductDetails() {
  // Utilisation du hook useSnackbar pour afficher des notifications
  const { enqueueSnackbar } = useSnackbar();

  // État local pour stocker les informations du produit
  const [product, setProduct] = useState(null);

  // État local pour stocker les produits dans le panier
  const [cart, setCart] = useState([]);

  // Récupération de l'identifiant du produit depuis l'URL
  const { productId } = useParams();
  const navigate = useNavigate();

  // Récupération de l'identifiant de l'utilisateur depuis le stockage local
  const userId = localStorage.getItem("user");
  const user = JSON.parse(userId);
  const currentUser = user._id;
  const iconStyles = { color: "black", fontSize: "1.3em" };

  // Hook useEffect pour charger les détails du produit lorsque le composant est monté
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${productId}`
        );
        setProduct(response.data);
        console.log(response.data);
        console.log(response.data.quantity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  // let [quantity, setQuantity] = useState(product.quantity);

  // Fonction pour ajouter le produit au panier
  const addProductToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3456/products/${productId}/addToCart/${currentUser}`
      );
      setCart(response.data);
      enqueueSnackbar("Product successfully added to cart", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/all-products");
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <ErrorPage />;
  }

  let addQuantity = () => {
    setQuantity += 1;
  };

  return (
    <>
      <div className="product-container ">
        <div className="flex flex-row justify-between  gap-4 px-12 py-10 md:flex-no-wrap">
          {/* Section de l'image du produit */}
          <div className="product-image md:w-1/2 md:mb-0">
            <div className="rounded-lg h-[700px] bg-gray-200">
              <Carousel>
                <img
                  className="w-full h-full object-fill rounded-lg"
                  src={product.images[0]}
                  alt="Product Image"
                />
                <img
                  className="w-full h-full object-fill rounded-lg"
                  src={product.images[1]}
                  alt="Product Image"
                />
                <img
                  className="w-full h-full object-fill rounded-lg"
                  src={product.images[2]}
                  alt="Product Image"
                />
              </Carousel>
            </div>
          </div>

          {/* Section des détails du produit */}
          <div className="product-details md:w-1/2 px-4">
            <div className="website-name flex items-center gap-3 text-orange-300 pt-9 pb-6">
              ECOM
              <div className="icon">
                <SiReactivex />
              </div>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                RAPH
              </span>
            </div>
            <h2 className="product-name text-6xl font-bold w-full text-black mb-10">
              {product.name}
            </h2>
            <div>
              <p className="font-bold text-black">Description:</p>
              <p className="product-description text-black text-sm mt-2 mb-8">
                {product.description}
              </p>
            </div>
            <div className="product-price flex pb-8 mb-4">
              <div className="text-black">
                <span className="price-value text-5xl  font-bold text-black">
                  ${product.price}
                </span>
              </div>
            </div>
            {/* Bouton pour ajouter le produit au panier et modifier la quantité */}
            <div className="flex gap-7 w-full">
              <div className="quantity flex rounded-md bg-orange-300">
                <button className="remove-quantity-btn flex items-center justify-center p-5 gap-4  text-white font-bold hover:bg-orange-200 hover:text-black hover:rounded-md">
                  <FiMinus style={iconStyles} />
                </button>
                <div className="quantity-number flex items-center p-5 font-bold">
                  {product.quantity}
                </div>

                <button
                  onClick={addQuantity}
                  className="add-quantity-btn flex items-center justify-center p-5 gap-4  text-white font-bold hover:bg-orange-200 hover:text-black hover:rounded-md "
                >
                  <FaPlus style={iconStyles} />
                </button>
              </div>

              <button
                onClick={addProductToCart}
                className="add-to-cart-btn flex items-center justify-center w-full p-4 gap-4 rounded-md bg-black text-white font-bold shadow-2xl hover:bg-orange-200 hover:text-black "
              >
                Add to Cart <IoCartOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
