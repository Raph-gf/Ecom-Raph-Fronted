import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

function PaymentPage() {
  const successIconStyles = { color: "#008000", fontSize: "300px" };
  const buttonStyles = {
    backgroundColor: "#008000",
    padding: "0.75rem 1.5rem",
    fontWeight: "600",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
  };

  return (
    <>
      <section className="payment-success-container flex flex-col justify-center items-center mx-14 mt-11">
        <div className="success-icons mb-8">
          <BsFillCheckCircleFill style={successIconStyles} />
        </div>
        <div className="success-text-wrapper flex-col items-center">
          <div className="first-text-part font-semibold text-xl pb-5">
            Félicitations ! Votre paiement a été effectué avec succès. Nous vous
            remercions pour votre achat et nous vous confirmons que votre
            commande a été traitée avec succès.
          </div>
          <div className="second-part">
            Vous recevrez bientôt une confirmation par e-mail avec les détails
            de votre commande. N'hésitez pas à nous contacter si vous avez des
            questions ou des préoccupations. Merci encore pour votre confiance
            et votre soutien !
          </div>
        </div>
        <div className="get-home-btn mt-5">
          <Link to="/">
            <button style={buttonStyles}>
              <p>Go home</p>
              <IoHome style={{ marginLeft: "0.5rem" }} />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default PaymentPage;
