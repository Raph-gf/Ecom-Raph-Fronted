import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar2 from "./components/navBar2";
import Homepage from "./pages/Hompage";
import Login from "./pages/Login";
import SignIn from "./pages/SIgn-In";
import Allproducts from "./pages/Allproducts";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import AdminUsers from "./pages/AdminUsers";
import UserInfos from "./pages/UserInfos";
import CreateUser from "./pages/CreateUser";
import AdminProduct from "./pages/AdminProduct";
import ProductInfos from "./pages/ProductInfos";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <>
      <Router>
        <NavBar2 />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/all-products" element={<Allproducts />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/users/:userID" element={<UserInfos />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/admin/all-products" element={<AdminProduct />} />
          <Route path="/admin/:productID" element={<ProductInfos />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
