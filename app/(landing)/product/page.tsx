import ProductGrid from "../components/product/product-grid";
import { getProducts } from "@/app/lib/shared-products";

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <main>
      <ProductGrid products={products} title="ALL PRODUCTS" showTitle={true} />
    </main>
  );
}

