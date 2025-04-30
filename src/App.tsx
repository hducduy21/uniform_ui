import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./layouts/DefaultLayout"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Cart from "./pages/Cart"
import AccountLayout from "./layouts/AccountLayout"
import ChangePassword from "./pages/account/ChangePassword"
import Profile from "./pages/account/Profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />

        <Route path="account" element={<AccountLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
