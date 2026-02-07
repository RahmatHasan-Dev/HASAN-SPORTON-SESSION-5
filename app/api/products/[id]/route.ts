import { NextResponse } from "next/server";

// Mock data - same as in products/route.ts
const products = [
  {
    _id: "1",
    name: "Pro Badminton Racket",
    description: "High quality badminton racket for professional players",
    price: 150000,
    stock: 10,
    category: {
      _id: "1",
      name: "Badminton",
      imageUrl: "/images/categories/category-badminton.png",
    },
    imageUrl: "/images/products/product-1.png",
  },
  {
    _id: "2",
    name: "Basketball Official Size",
    description: "Official size basketball for professional games",
    price: 250000,
    stock: 15,
    category: {
      _id: "2",
      name: "Basketball",
      imageUrl: "/images/categories/category-basketball.png",
    },
    imageUrl: "/images/products/product-2.png",
  },
  {
    _id: "3",
    name: "Running Shoes Pro",
    description: "Lightweight running shoes for marathon runners",
    price: 450000,
    stock: 8,
    category: {
      _id: "4",
      name: "Running",
      imageUrl: "/images/categories/category-running.png",
    },
    imageUrl: "/images/products/product-3.png",
  },
  {
    _id: "4",
    name: "Swimming Goggles",
    description: "Professional swimming goggles with anti-fog",
    price: 85000,
    stock: 20,
    category: {
      _id: "5",
      name: "Swimming",
      imageUrl: "/images/categories/category-swimming.png",
    },
    imageUrl: "/images/products/product-4.png",
  },
  {
    _id: "5",
    name: "Tennis Racket Elite",
    description: "Elite tennis racket for competitive play",
    price: 350000,
    stock: 12,
    category: {
      _id: "6",
      name: "Tennis",
      imageUrl: "/images/categories/category-tennis.png",
    },
    imageUrl: "/images/products/product-5.png",
  },
  {
    _id: "6",
    name: "Football Cleats",
    description: "Professional football cleats for turf",
    price: 280000,
    stock: 18,
    category: {
      _id: "3",
      name: "Football",
      imageUrl: "/images/categories/category-football.png",
    },
    imageUrl: "/images/products/product-6.png",
  },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id && id !== "undefined" && id !== "null") {
    const product = products.find((p) => p._id === id);
    if (product) {
      return NextResponse.json(product);
    }
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(products);
}

