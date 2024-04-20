import axios from "axios";
import { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import "../App.css";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Homepage() {
  const iconStyles = { color: "white", fontSize: "1.5em" };
  const socialIcon = { color: "black", fontSize: "2em" };

  const [products, setProducts] = useState([]);
  const homeProduct = products.slice(0, 4);

  useEffect(() => {
    const displayProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/all-products`
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    displayProducts();
  }, []);

  return (
    <>
      <div className="Navbar mb-8 w-screen "></div>
      <section className="First-section flex min-[940px]:flex-row gap-10 justify-center mb-40 w-screen px-10 mt-20 sm:flex-col">
        <div className="text-section w-full">
          <h3>Find our latest products</h3>
          <h1 className="title md:text-8xl w-full mb-8 mt-4 font-bold sm:text-4xl">
            News Products just arrived
          </h1>
          <div className="socialIcon flex gap-3 mb-7 hover:cursor-pointer ">
            <FaInstagram style={socialIcon} />
            <FaTwitter style={socialIcon} />
            <FaLinkedinIn style={socialIcon} />
            <FaTiktok style={socialIcon} />
          </div>
          <p className="undertext mb-8">
            Discover stylish Converse arrivals, quality comfort, and innovation
            for your active life.
          </p>
          <Link to="/all-products">
            <button
              type="button"
              className="flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-black text-white rounded-full hover:bg-orange-200 hover:text-black"
            >
              Shop now
              <img
                src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20%2010C20%2015.5228%2015.5228%2020%2010%2020C4.47715%2020%200%2015.5228%200%2010C0%204.47715%204.47715%200%2010%200C15.5228%200%2020%204.47715%2020%2010Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.0886%206.18499C10.8717%206.43163%2010.8717%206.83153%2011.0886%207.07817L13.1032%209.36842H5.55556C5.24873%209.36842%205%209.65119%205%2010C5%2010.3488%205.24873%2010.6316%205.55556%2010.6316H13.1032L11.0886%2012.9218C10.8717%2013.1685%2010.8717%2013.5684%2011.0886%2013.815C11.3056%2014.0617%2011.6574%2014.0617%2011.8743%2013.815L14.8373%2010.4466C15.0542%2010.1999%2015.0542%209.80005%2014.8373%209.55341L11.8743%206.18499C11.6574%205.93834%2011.3056%205.93834%2011.0886%206.18499Z'%20fill='%233c2c5b'/%3e%3c/svg%3e"
                alt="arrow right icon"
                className="ml-2 rounded-full w-5 h-5"
              ></img>
            </button>
          </Link>
        </div>
        <div className="image-section bg-orange-200 p-8 rounded-md">
          <img
            className="img h-full rounded-md"
            src="https://images.unsplash.com/photo-1622592468562-2c54c0b8bbb7?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D p-8"
            alt=""
          />
        </div>
      </section>
      <section className="Second-section px-10 w-screen mb-40">
        <h1 className="Popular-Product md:text-8xl mb-7 sm:text-4xl">
          Our <span className="Popular text-orange-300 mr-2">Popular</span>{" "}
          Products
        </h1>
        <p className="undertext max-w-3xl mb-14">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value.
        </p>
        <div className="grid gap-x-6 gap-y-6 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {homeProduct.map((product, index) => (
            <Link to={`/products/${product._id}`} key={index}>
              <Card
                key={index}
                images={product.images}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="Thrid-section">
        <div className="under-section flex md:flex-row gap-10 justify-center items-center mb-40 w-screen px-10 mt-40 sm:flex-col">
          <div className="text">
            <h1 className="title text-8xl mb-7">
              We Provide You{" "}
              <span className="text-orange-300">Super Quality</span> Product
            </h1>
            <p className="under-text mb-5">
              Ensuring premium comfort and style, our meticulously crafted
              product is designed to elevate your experience, providing you with
              unmatched quality, innovation, and a touch of elegance.
            </p>
            <p className="undertext2 mb-10">
              Our dedication to detail and excellence ensures your satisfaction
            </p>

            <button
              type="button"
              className="flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-black text-white rounded-full hover:bg-orange-200 hover:text-black"
            >
              View details
              <img
                src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20%2010C20%2015.5228%2015.5228%2020%2010%2020C4.47715%2020%200%2015.5228%200%2010C0%204.47715%204.47715%200%2010%200C15.5228%200%2020%204.47715%2020%2010Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.0886%206.18499C10.8717%206.43163%2010.8717%206.83153%2011.0886%207.07817L13.1032%209.36842H5.55556C5.24873%209.36842%205%209.65119%205%2010C5%2010.3488%205.24873%2010.6316%205.55556%2010.6316H13.1032L11.0886%2012.9218C10.8717%2013.1685%2010.8717%2013.5684%2011.0886%2013.815C11.3056%2014.0617%2011.6574%2014.0617%2011.8743%2013.815L14.8373%2010.4466C15.0542%2010.1999%2015.0542%209.80005%2014.8373%209.55341L11.8743%206.18499C11.6574%205.93834%2011.3056%205.93834%2011.0886%206.18499Z'%20fill='%233c2c5b'/%3e%3c/svg%3e"
                alt="arrow right icon"
                className="ml-2 rounded-full w-5 h-5"
              ></img>
            </button>
          </div>
          <div className="image2 rounded-md w-4/5">
            <img className="rounded-md" src="src/assets/cozyHome.jpg" alt="" />
          </div>
        </div>
      </section>
      <section className="Fourth-section max-container flex justify-center flex-wrap gap-9 w-screen px-10 ">
        <div className="box1 flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-2xl px-10 py-16 ">
          <div className="logo w-11 h-11 flex justify-center items-center bg-black rounded-full ">
            <FaShippingFast style={iconStyles} />
          </div>
          <h3 className="box-title mt-10 font-palanquin text-3xl leading-normal font-bold">
            <span className="text-orange-300">F</span>ree shipping
          </h3>
          <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
            Enjoy seamless shopping with our complimentary shipping service.
          </p>
        </div>
        <div className="box2 flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-2xl px-10 py-16">
          <div className="logo w-11 h-11 flex justify-center items-center bg-black  rounded-full ">
            <RiSecurePaymentLine style={iconStyles} />
          </div>
          <h3 className="box-title mt-10 font-palanquin text-3xl leading-normal font-bold">
            <span className="text-orange-300">S</span>ecure Payment
          </h3>
          <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
            Experience worry-free transactions with our secure payment options.
          </p>
        </div>
        <div className="box3 flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-2xl px-10 py-16">
          <div className="logo w-11 h-11 flex justify-center items-center bg-black rounded-full ">
            <FaHandsHelping style={iconStyles} />
          </div>
          <h3 className="box-title mt-10 font-palanquin text-3xl leading-normal font-bold">
            <span className="text-orange-300">L</span>ove to help you
          </h3>
          <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
            Our dedicated team is here to assist you every step of the way.
          </p>
        </div>
      </section>
      <section className="Fifth-section px-10 w-screen mt-40 mb-40">
        <div className="under-section flex md:flex-row items-center gap-20 sm:flex-col ">
          <div className="image3 grid grid-cols-2 gap-3 ">
            <img
              className="h-full w-full rounded-lg col-span-2"
              src="src/assets/cozyHome2 1.jpg"
              alt=""
            />
            <img
              className="h-full w-full rounded-lg "
              src="src/assets/bougie.jpg"
              alt=""
            />
            <img
              className="h-full w-full rounded-lg "
              src="src/assets/lampe.jpg"
              alt=""
            />
          </div>
          <div className="text">
            <h1 className="title text-8xl mb-7">
              <span className="text-orange-300">Special</span> Offer
            </h1>
            <p className="undertext1 mb-5">
              Embark on a shopping journey that redefines your experience with
              unbeatable deals. From premier selections to incredible savings,
              we offer unparalleled value that sets us apart.
            </p>
            <p className="undertext2 mb-10">
              Navigate a realm of possibilities designed to fulfill your unique
              desires, surpassing the loftiest expectations. Your journey with
              us is nothing short of exceptional.
            </p>
            <div className="buttons flex gap-3">
              <Link to="/all-products">
                <button className="button-shop flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-black text-white rounded-full hover:bg-orange-200 hover:text-black">
                  Shop now
                  <img
                    src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20%2010C20%2015.5228%2015.5228%2020%2010%2020C4.47715%2020%200%2015.5228%200%2010C0%204.47715%204.47715%200%2010%200C15.5228%200%2020%204.47715%2020%2010Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.0886%206.18499C10.8717%206.43163%2010.8717%206.83153%2011.0886%207.07817L13.1032%209.36842H5.55556C5.24873%209.36842%205%209.65119%205%2010C5%2010.3488%205.24873%2010.6316%205.55556%2010.6316H13.1032L11.0886%2012.9218C10.8717%2013.1685%2010.8717%2013.5684%2011.0886%2013.815C11.3056%2014.0617%2011.6574%2014.0617%2011.8743%2013.815L14.8373%2010.4466C15.0542%2010.1999%2015.0542%209.80005%2014.8373%209.55341L11.8743%206.18499C11.6574%205.93834%2011.3056%205.93834%2011.0886%206.18499Z'%20fill='%233c2c5b'/%3e%3c/svg%3e"
                    alt="arrow right icon"
                    className="ml-2 rounded-full w-5 h-5"
                  ></img>
                </button>
              </Link>
              <button className="button-shop flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-orange-200 text-black rounded-full hover:bg-orange-200 ">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
