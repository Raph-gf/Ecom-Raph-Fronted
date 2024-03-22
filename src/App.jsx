import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar2 from "./components/navBar2";
import Homepage from "./pages/Hompage";
import Login from "./pages/Login";
import SignIn from "./pages/SIgn-In";
import Allproducts from "./pages/Allproducts";
import ProductDetails from "./pages/ProductDetails";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
