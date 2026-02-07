"use client";

const OrderStatusRefresh = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <button 
      onClick={reloadPage}
      className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
    >
      Refresh Page
    </button>
  );
};

export default OrderStatusRefresh;

