import React from "react";
import { CiInstagram } from "react-icons/ci";
import { TiSocialTwitter } from "react-icons/ti";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { PiLinkedinLogoLight } from "react-icons/pi";

function SideBar() {
  return (
    <div className="SideBar-wrapper">
      <h3 className="sideBar-title">📍 Navigation</h3>
      <hr />

      <ul>
        <li href="" className="link">
          Mon compte
        </li>
        <li href="" className="link">
          Mon panier
        </li>
        <li href="" className="link">
          Nous contacter
        </li>
        <li href="" className="link"></li>
      </ul>
      <hr />
      <ul>
        <li className="">Nos Produits</li>
        <li className=""> Nos Magasins</li>
        <li className="">A propos de E-com Raph</li>
      </ul>
      <hr />
      <ul>
        <li className="">Connexion</li>
        <li className="">S'inscrire</li>
      </ul>
      <hr />
      <h3 className="">Retrouvez nous aussi </h3>
      <ul>
        <div className="SideBar-bottom-link">
          <div className="Sidebar-icons">
            <CiInstagram />
          </div>
          <div className="link">
            <li className="">Instagram</li>
          </div>
        </div>
        <div className="SideBar-bottom-link">
          <div className="Sidebar-icons">
            <TiSocialTwitter />
          </div>
          <div className="link">
            <li className="">Twitter</li>
          </div>
        </div>
        <div className="SideBar-bottom-link">
          <div className="Sidebar-icons">
            <BiLogoFacebookSquare />
          </div>
          <div className="link">
            <li className="">Facebook</li>
          </div>
        </div>
        <div className="SideBar-bottom-link">
          <div className="Sidebar-icons">
            <PiLinkedinLogoLight />
          </div>
          <div className="link">
            <li className="">Linkedin</li>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default SideBar;
