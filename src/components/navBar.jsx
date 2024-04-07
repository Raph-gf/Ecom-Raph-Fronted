import { SiReactivex } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "flowbite-react";

function NavBar() {
  const iconStyles = { fontSize: "1.3em" };

  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const userProfile = userData ? userData.firstname : "";

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {userData && userData.isAdmin === true ? (
        <nav className="navbar bg-white border-gray-200 w-screen">
          <div className="navbar-content w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 pt-6 mb-6">
            <Link
              to="/"
              className="brand flex items-center space-x-3 rtl:space-x-reverse"
            >
              <h1 className="text-black">ECOM</h1>
              <div className="icon">
                <SiReactivex />
              </div>

              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                RAPH
              </span>
            </Link>

            <div
              className="links hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="menu font-medium flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white dark:border-gray-700 gap-2 items-center">
                <li className="menu-item flex flex-row">
                  <Link
                    to="/"
                    className="py-2 px-3 rounded md:bg-transparent md:p-0 text-orange-400 flex flex-row items-center gap-1 hover:text-orange-400"
                    aria-current="page"
                  >
                    <TiHome />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/users">
                    <button className="menu-button py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 hover:text-orange-400 md:dark:hover:bg-transparent">
                      Users
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/all-products"
                    className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Products
                  </Link>
                </li>

                <div className="profile flex flex-row items-center gap-3">
                  <li className="nav-items">Welcome {userProfile}</li>

                  <div className="avatar-container flex flex-wrap gap-2">
                    <Avatar rounded />
                  </div>
                </div>

                <li>
                  <button
                    onClick={Logout}
                    className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <div className="navbar bg-white border-gray-200 w-screen">
          <div className="navbar-content w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 pt-6 mb-6">
            <Link
              to="/"
              className="brand flex items-center space-x-3 rtl:space-x-reverse"
            >
              <h1 className="text-black">ECOM</h1>
              <div className="icon">
                <SiReactivex />
              </div>

              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                RAPH
              </span>
            </Link>

            <div
              className="links hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="menu font-medium flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white dark:border-gray-700 gap-2 items-center">
                <li className="menu-item flex flex-row">
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
                        const element =
                          document.querySelector(".Second-section");
                        element?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="menu-button py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      About us
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="all-products"
                    className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <button
                      onClick={() => {
                        const element =
                          document.querySelector(".Fifth-section");
                        element?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="menu-button py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Contact us
                    </button>
                  </Link>
                </li>
                {userData ? (
                  <>
                    <li>
                      <Link
                        to="cart"
                        className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        <IoCart style={iconStyles} />
                      </Link>
                    </li>
                    <div className="profile flex flex-row items-center gap-1">
                      <li className="nav-items">Welcome {userProfile}</li>

                      <div className="avatar-container flex flex-wrap gap-2">
                        <Avatar rounded />
                      </div>
                    </div>

                    <li>
                      <button
                        onClick={Logout}
                        className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to={"/login"}
                        className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sign-in"
                        className="menu-link py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-black md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
