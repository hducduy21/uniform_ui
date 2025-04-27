import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./layouts/DefaultLayout"
import Products from "./pages/Products"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}

export default App
