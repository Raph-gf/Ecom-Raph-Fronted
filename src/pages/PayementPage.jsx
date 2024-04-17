import { Button } from "flowbite-react";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

function PayementPage() {
  const iconStyles = { color: "green", fontSize: "300px" };
  return (
    <>
      <section className="success-container flex flex-col justify-center items-center mx-14 mt-11">
        <div className="succes-icons mb-8">
          <BsFillCheckCircleFill style={iconStyles} />
        </div>
        <div className="succes-text-wrapper flex-col items-center">
          <div className="first-text_part font-semibold text-xl pb-5">
            Félicitations ! Votre paiement a été effectué avec succès. Nous vous
            remercions pour votre achat et nous vous confirmons que votre
            commande a été traitée avec succès.
          </div>
          <div className="first-second_part">
            Vous recevrez bientôt une confirmation par e-mail avec les détails
            de votre commande. N'hésitez pas à nous contacter si vous avez des
            questions ou des préoccupations. Merci encore pour votre confiance
            et votre soutien !
          </div>
        </div>
        <div className="get-home-btn mt-5">
          <Link to="/">
            <button className="flex flex-row items-center gap-2 bg-[#008000] p-3 font-semibold text-white border-none rounded-lg shadow-2xl ">
              <p>Go home</p>
              <IoHome />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default PayementPage;
