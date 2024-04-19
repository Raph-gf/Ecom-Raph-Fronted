import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Hompage";
import Login from "./pages/Login";
import SignIn from "./pages/SIgn-In";
import NavBar from "./components/NavBar";
import Allproducts from "./pages/Allproducts";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import AdminUsers from "./pages/AdminUsers";
import UserInfos from "./pages/AdminUserInfos";
import CreateUser from "./pages/CreateUser";
import AdminProduct from "./pages/AdminProduct";
import ProductInfos from "./pages/AdminProductInfos";
import CreateProduct from "./pages/CreateProduct";
import PayementPage from "./pages/PayementPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/all-products" element={<Allproducts />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/:userId/cart" element={<ShoppingCart />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/users/:userID" element={<UserInfos />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/admin/all-products" element={<AdminProduct />} />
          <Route path="/admin/:productID" element={<ProductInfos />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/stripe/payment/success" element={<PayementPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
