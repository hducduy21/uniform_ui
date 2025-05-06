import ProductCard from "@/components/modules/product/ProductCard";
import {products } from "@/data/mock";

const WishList = () => {
  return (
    <div className="pt-16 pb-24 bg-white">

      {/* Product grid */}
      <div className="container px-4 mx-auto mt-6">
        <h1 className="my-8 text-2xl font-bold">WISHLIST</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}

export default WishList