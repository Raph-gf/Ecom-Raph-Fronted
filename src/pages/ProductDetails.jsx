import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/products/${productId}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);
  if (!product) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <h1 className="">{product.name}</h1>
      <img src={product.image} alt="" />
      <p>{product.description}</p>
      <p>{product.price}</p>
    </>
  );
}

export default ProductDetails;
