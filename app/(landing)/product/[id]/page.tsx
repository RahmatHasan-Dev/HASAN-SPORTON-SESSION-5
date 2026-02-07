import Image from "next/image";
import ProductActions from "../../components/product-detail/product-actions";
import priceFormatter from "@/app/utils/price-formatter";
import { getImageUrl } from "@/app/lib/api";
import { products } from "@/app/lib/shared-products";

export type TPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetail = async ({ params }: TPageProps) => {
  const { id } = await params;

  // Validate ID
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return (
      <main className="container mx-auto py-40 flex gap-12">
        <div className="text-center w-full">
          <h1 className="font-bold text-3xl mb-4">Invalid Product ID</h1>
          <p className="text-gray-600">Please check your product link and try again.</p>
        </div>
      </main>
    );
  }

  // Find product from local shared data
  const product = products.find((p) => p._id === id);

  // Handle case when product is not found
  if (!product) {
    return (
      <main className="container mx-auto py-40 flex gap-12">
        <div className="text-center w-full">
          <h1 className="font-bold text-3xl mb-4">Product Not Found</h1>
          <p className="text-gray-600">We couldn&apos;t find this product. Please check your product link or contact support.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-40 flex gap-12">
      <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center">
        {(() => {
          const imageSrc = product.imageUrl ? getImageUrl(product.imageUrl) : null;
          if (imageSrc) {
            return (
              <Image
                src={imageSrc}
                width={550}
                height={550}
                alt={product.name || "Product Image"}
                className="aspect-square object-contain w-full"
              />
            );
          }
          return null;
        })()}
      </div>
      <div className="w-full py-7">
        <h1 className="font-bold text-5xl mb-6">{product.name}</h1>
        <div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
          {product.category?.name || "Uncategorized"}
        </div>
        <p className="leading-loose mb-8">{product.description}</p>
        <div className="text-primary text-[32px] font-semibold mb-12">
          {priceFormatter(product.price)}
        </div>
        <div className="mb-5">Stock Product : {product.stock}</div>
        <ProductActions product={product} stock={product.stock} />
      </div>
    </main>
  );
};

export default ProductDetail;

