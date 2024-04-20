import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [Adress, setAdress] = useState("");
  const [token, setToken] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/inscription`,
        {
          email,
          password,
          firstname,
          lastname,
          zipCode,
          Adress,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data.createToken));
      setToken(response.data.token);
      enqueueSnackbar("Sign-in succefully completed", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Email already exists"
      ) {
        enqueueSnackbar(
          "L'adresse e-mail existe déjà. Veuillez en choisir une autre.",
          {
            variant: "error",
            autoHideDuration: 3000,
          }
        );
      } else {
        console.log(
          "Une erreur s'est produite lors de l'inscription :",
          error.response.data.error
        );
      }
    }
  };

  return (
    <>
      <section className="relative flex flex-wrap px-8 lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-8xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Bienvenue sur ECOM-RAPH ! Créez votre compte ou connectez vous dès
              maintenant pour bénéficier d'offres spéciales et recevoir les
              dernières nouvelles concernant nos nouveaux produits à venir.
              Abonnez-vous également à notre newsletter pour rester informé(e)
              des prochaines nouveautés.
            </p>
          </div>

          <form
            action="#"
            onSubmit={handleSignIn}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            {/* Input pour le FirstName */}
            <div>
              <label htmlFor="firstname" className="sr-only">
                FirstName
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>

            {/* Input pour le LastName*/}
            <div>
              <label htmlFor="LastName" className="sr-only">
                LastName
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter LastName"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            {/* Input 3 pour l'email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Icône pour l'email */}
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {/* Input pour le mot de passe */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {/* Input pour le zipCode */}
            <div>
              <label htmlFor="zipCode" className="sr-only">
                zipCode
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter zipCode"
                  value={zipCode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
            </div>
            {/* Input pour l'Adresse */}
            <div>
              <label htmlFor="Adress" className="sr-only">
                Adress
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter adress"
                  value={Adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>
            </div>
            {/* Bouton de soumission */}
            <div className="flex items-center justify-between mt-24">
              <p className="text-sm text-gray-500">No account?</p>
              <Link
                to="/login"
                className="underline text-sm text-gray-500"
                href="#"
              >
                Login
              </Link>
              <button
                type="submit"
                className="inline-block rounded-lg bg-orange-200 px-5 py-3 text-sm font-medium text-black"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* Image à droite */}
        <div className="relative h-40 w-full  sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto"
            className="img h-full w-full rounded-md mt-9 object-cover"
          />
        </div>
      </section>
    </>
  );
}

export default SignIn;
