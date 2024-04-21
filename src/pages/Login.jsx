import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "notistack";

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/connexion`,
        { email, password }
      );
      console.log(response.data);
      const { token } = response.data;
      const decodedUser = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setToken(response.data.token);
      enqueueSnackbar("Connexion successfully completed", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Connexion failed please verify your email or password", {
        variant: "error",
        autoHideDuration: 3000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <section className="welcome-section relative flex flex-wrap px-8 lg:h-screen lg:items-center">
        <div className="login-form w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
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
            onSubmit={handleUserLogin}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
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

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
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

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">No account?</p>
              <Link
                to="/sign-up"
                className="signup-link underline text-sm text-gray-500"
                href="#"
              >
                Sign up
              </Link>
              <button
                type="submit"
                className="login-btn inline-block rounded-lg bg-orange-200 px-5 py-3 text-sm font-medium text-black"
              >
                Login in
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-40 w-full sm:h-96 lg:h-full lg:w-1/2">
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

export default Login;
