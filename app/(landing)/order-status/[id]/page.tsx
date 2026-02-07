import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { TPageProps } from "../../product/[id]/page";
import OrderRejected from "../../components/order-status/order-rejected";
import OrderStatusRefresh from "../../components/order-status/order-status-refresh";
import { getTransactionById } from "@/app/lib/shared-data";

// Force dynamic rendering to prevent SSG pre-rendering issues
export const dynamic = "force-dynamic";

const OrderStatus = async ({ params }: TPageProps) => {
  const { id } = await params;

  // Validate ID
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return (
      <main className="bg-gray-100 min-h-[80vh]">
        <div className="max-w-5xl mx-auto pt-40 pb-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
          <div className="text-center">
            <p className="text-xl text-gray-600">Invalid order ID</p>
            <p className="text-sm text-gray-400 mt-2">
              Please check your order link and try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Find transaction from local shared data
  const transaction = getTransactionById(id);

  // Handle transaction not found
  if (!transaction) {
    return (
      <main className="bg-gray-100 min-h-[80vh]">
        <div className="max-w-5xl mx-auto pt-40 pb-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
          <div className="text-center">
            <p className="text-xl text-gray-600">Transaction not found</p>
            <p className="text-sm text-gray-400 mt-2">
              Your order may still be processing. Please wait a moment and refresh the page.
            </p>
            <OrderStatusRefresh />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto pt-40 pb-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
      </div>
      {transaction.status === "pending" && <OrderSubmitted />}
      {transaction.status === "paid" && <OrderConfirmed />}
      {transaction.status === "rejected" && <OrderRejected />}
    </main>
  );
};

export default OrderStatus;

