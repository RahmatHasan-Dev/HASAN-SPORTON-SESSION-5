import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";
import ProductsSection from "./components/home/products";
import { getCategories } from "../lib/shared-categories";
import { getProducts } from "../lib/shared-products";

export default async function Home() {
  const [categories, products] = await Promise.all([
    Promise.resolve(getCategories()),
    Promise.resolve(getProducts()),
  ]);

  return (
    <main>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
    </main>
  );
}

