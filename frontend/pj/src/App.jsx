import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BecomeSeller from "./pages/BecomeSeller";
import SellerDashboard from "./pages/SellerDashboard";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";

const App = () => {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/become-seller"
          element={<BecomeSeller />}
        />

        <Route
          path="/seller-dashboard"
          element={<SellerDashboard />}
        />

        <Route
          path="/products"
          element={<AllProducts />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;