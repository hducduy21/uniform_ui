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
import WishList from "./pages/WishList"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./layouts/PrivateRoute"
import AdminLayout from "./layouts/AdminLayout"
import ProductManagement from "./pages/admin/ProductsManagement"
import ProductCreation from "./pages/admin/ProductCreation"

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
              <Route index path="dashboard" element={<></> } />
              <Route path="products/creation" element={<ProductCreation />} />
              <Route path="products" element={<ProductManagement />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />

          <Route element={<PrivateRoute />}>
            <Route path="account" element={<AccountLayout />}>
              <Route index path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
      </Routes>
    </AuthProvider>
    
  )
}

export default App
