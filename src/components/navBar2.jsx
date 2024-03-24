import { SiReactivex } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar2() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const userProfile = userData ? userData.firstname : "";

  const newUserData = JSON.parse(localStorage.getItem("newUser"));
  const newUserProfile = newUserData ? newUserData.firstname : "";

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("newUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 w-screen">
        <div className=" Logo w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 pt-6 mb-6">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="text-black">ECOM</h1>
            <div className="icon">
              <SiReactivex />
            </div>

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              RAPH
            </span>
          </a>

          <div
            className=" Links hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white dark:border-gray-700 gap-2 items-center">
              <li className="flex flex-row">
                <Link
                  to="/"
                  className="py-2 px-3 rounded md:bg-transparent md:p-0 text-orange-400 flex flex-row items-center gap-1"
                  aria-current="page"
                >
                  <TiHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button
                    onClick={() => {
                      const element = document.querySelector(".Second-section");
                      element?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-b md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    About us
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="all-products"
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button
                    onClick={() => {
                      const element = document.querySelector(".Fifth-section");
                      element?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact us
                  </button>
                </Link>
              </li>

              {newUserData ? (
                <>
                  <div className="profile flex flex-row items-center gap-1">
                    <li className="nav-items">Bienvenue {newUserProfile}</li>
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-black">
                      <svg
                        className="absolute w-12 h-12 text-white -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <li>
                    <a
                      href="#"
                      onClick={Logout}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Déconnexion
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/sign-in"
                      href="#"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}

              {userData ? (
                <>
                  <div className="profile flex flex-row items-center gap-1">
                    <li className="nav-items">Bienvenue {userProfile}</li>

                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-black">
                      <svg
                        className="absolute w-12 h-12 text-white -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <li>
                    <a
                      href="#"
                      onClick={Logout}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Déconnexion
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      href="#"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar2;
