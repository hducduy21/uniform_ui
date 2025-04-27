import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./layouts/DefaultLayout"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  )
}

export default App
