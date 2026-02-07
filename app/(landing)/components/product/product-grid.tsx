"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";
import priceFormatter from "@/app/utils/price-formatter";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";

type TProductGridProps = {
  products: Product[];
  title?: string;
  showTitle?: boolean;
};

const ProductGrid = ({
  products,
  title = "OUR PRODUCTS",
  showTitle = true,
}: TProductGridProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  if (products.length === 0) {
    return (
      <section id="product-grid-section" className="container mx-auto mt-32 mb-52">
        {showTitle && (
          <h2 className="font-bold italic text-4xl text-center mb-11">
            <span className="text-primary">{title.split(" ")[0]}</span>{" "}
            {title.split(" ").slice(1).join(" ")}
          </h2>
        )}
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="product-grid-section" className="container mx-auto mt-32 mb-52">
      {showTitle && (
        <h2 className="font-bold italic text-4xl text-center mb-11">
          <span className="text-primary">{title.split(" ")[0]}</span>{" "}
          {title.split(" ").slice(1).join(" ")}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300"
          >
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              {(() => {
                const imageSrc = product.imageUrl
                  ? getImageUrl(product.imageUrl)
                  : null;
                if (imageSrc) {
                  return (
                    <Image
                      src={imageSrc}
                      alt={product.name || "Product Image"}
                      width={300}
                      height={300}
                      className="aspect-square object-contain"
                    />
                  );
                }
                return null;
              })()}
              <Button
                className="w-10 h-10 p-2! absolute top-3 right-3"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <FiPlus size={24} />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">
                {product.category?.name || "Uncategorized"}
              </div>
              <div className="font-medium text-primary">
                {priceFormatter(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

