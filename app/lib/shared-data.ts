// Shared in-memory data store for mock data
// Note: This data is ephemeral and will reset on server restart

export interface TransactionItem {
  productId: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: {
      _id: string;
      name: string;
      imageUrl: string;
    };
    stock: number;
    price: number;
  };
  qty: number;
}

export interface TransactionData {
  _id: string;
  customerName: string;
  customerContact: number | null;
  customerAddress: string;
  totalPayment: string;
  paymentProof: string;
  purchasedItems: TransactionItem[];
  status: "pending" | "paid" | "rejected";
  createdAt: string;
  updatedAt: string;
}

// Use global to persist across module reloads in development
declare global {
  var __transactions: TransactionData[] | undefined;
}

let transactions: TransactionData[] = globalThis.__transactions ?? [
  {
    _id: "tx-1",
    customerName: "John Doe",
    customerContact: 62812345678,
    customerAddress: "Jl. Sudirman No. 123, Jakarta",
    totalPayment: "1500000",
    paymentProof: "/images/payment-proof-dummy.png",
    purchasedItems: [
      {
        productId: {
          _id: "1",
          name: "Pro Badminton Racket",
          description: "High quality badminton racket",
          imageUrl: "/images/products/product-1.png",
          category: {
            _id: "1",
            name: "Badminton",
            imageUrl: "/images/categories/category-badminton.png",
          },
          stock: 10,
          price: 150000,
        },
        qty: 2,
      },
    ],
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Persist to global to avoid module reload issues
globalThis.__transactions = transactions;

export function addTransaction(transaction: TransactionData) {
  transactions.unshift(transaction);
}

export function updateTransactionStatus(
  id: string,
  status: "pending" | "paid" | "rejected"
) {
  const transaction = transactions.find((t) => t._id === id);
  if (transaction) {
    transaction.status = status;
    transaction.updatedAt = new Date().toISOString();
  }
  return transaction;
}

export function getTransactions() {
  return transactions;
}

export function getTransactionById(id: string): TransactionData | undefined {
  return transactions.find((t) => t._id === id);
}

