import { NextResponse } from "next/server";
import { addTransaction, type TransactionData, type TransactionItem } from "@/app/lib/shared-data";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Mock products data for expanding product details
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper function to get product by ID
function getProductById(id: string) {
  return products.find((p) => p._id === id);
}

// Helper function to expand items with full product details
function expandItems(items: { _id: string; qty: number }[]): TransactionItem[] {
  return items.map((item) => {
    const product = getProductById(item._id);
    if (!product) {
      throw new Error(`Product with ID ${item._id} not found`);
    }
    return {
      productId: {
        _id: product._id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        price: product.price,
      },
      qty: item.qty,
    };
  });
}

// Helper function to save uploaded file
async function saveUploadedFile(file: File | null): Promise<string> {
  if (!file) {
    return "";
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "png";
    const filename = `payment-${timestamp}.${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/images/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return "";
  }
}

// Mock checkout handler
export async function POST(request: Request) {
  console.log("=== CHECKOUT API CALLED ===");
  
  try {
    const contentType = request.headers.get("content-type");
    console.log("Content-Type:", contentType);

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}`;
    console.log("Order ID:", orderId);

    if (!contentType || !contentType.includes("application/json")) {
      console.log("Processing FormData...");
      
      // Parse FormData for payment proof uploads
      const formData = await request.formData();
      
      // Extract transaction details from FormData
      const customerName = formData.get("customerName") as string || "Unknown";
      const customerContactStr = formData.get("customerContact") as string || "0";
      const customerContact = parseInt(customerContactStr) || null;
      const customerAddress = formData.get("customerAddress") as string || "";
      
      // Handle totalPayment - frontend sends "totalPrice"
      const totalPriceStr = formData.get("totalPrice") as string || "0";
      const totalPayment = totalPriceStr;
      
      // Handle payment proof - frontend sends "image"
      const imageFile = formData.get("image") as File | null;
      console.log("Image file:", imageFile?.name || "none");
      const paymentProof = await saveUploadedFile(imageFile);
      console.log("Payment proof path:", paymentProof);
      
      // Handle purchased items - frontend sends "items"
      const itemsJson = formData.get("items") as string || "[]";
      console.log("Items JSON:", itemsJson);
      
      let itemsRaw;
      try {
        itemsRaw = JSON.parse(itemsJson);
      } catch {
        itemsRaw = [];
      }

      console.log("Items parsed:", itemsRaw);

      // Expand items with full product details
      const purchasedItems = expandItems(itemsRaw);
      console.log("Items expanded:", purchasedItems.length, "items");

      // Create new transaction object
      const newTransaction: TransactionData = {
        _id: orderId,
        customerName,
        customerContact,
        customerAddress,
        totalPayment,
        paymentProof,
        purchasedItems,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Saving transaction...");
      // Save to shared data store
      addTransaction(newTransaction);
      console.log("Transaction saved successfully:", orderId);

      // Return _id at root level to match expected response format
      return NextResponse.json({
        _id: orderId,
        success: true,
        orderId,
        message: "Order placed successfully",
      });
    }

    const body = await request.json().catch(() => ({}));
    console.log("Processing JSON body...");

    // Parse customerContact to number
    const customerContact = typeof body.customerContact === 'string' 
      ? parseInt(body.customerContact) || null 
      : body.customerContact || null;

    // Handle items - frontend sends "items", backend expects "purchasedItems"
    const itemsRaw = body.items || body.purchasedItems || [];
    const purchasedItems = expandItems(itemsRaw);

    // Handle totalPayment - frontend sends "totalPrice", backend expects "totalPayment"
    const totalPayment = body.totalPayment || body.totalPrice || "0";

    // Create transaction object for JSON requests
    const newTransaction: TransactionData = {
      _id: orderId,
      customerName: body.customerName || "Unknown",
      customerContact,
      customerAddress: body.customerAddress || "",
      totalPayment,
      paymentProof: body.paymentProof || "",
      purchasedItems,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to shared data store
    addTransaction(newTransaction);

    // Mock successful checkout
    return NextResponse.json({
      _id: orderId,
      success: true,
      orderId,
      message: "Order placed successfully",
      order: {
        ...body,
        _id: orderId,
        customerContact,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("=== CHECKOUT ERROR ===");
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Checkout failed" },
      { status: 500 }
    );
  }
}

