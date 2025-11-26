import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CourseCard({ id, name, price, image, onCheckout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-colors">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ₹{price}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        course={{ id, name, price, image }}
        onCheckout={async (payload) => {
          const response = await fetch(`http://localhost:4000/create/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const { orderId } = await response.json();

          setOpen(false);
          onCheckout?.(payload);

          const rzp = new Razorpay({
            key: "rzp_test_RhoyP50kyYLgAi",
            order_id: orderId,
            theme: {
              color: "#222",
            },
            handler: async (res) => {
              console.log(res);
              const response = await fetch(
                `http://localhost:4000/complete/order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    rzpOrderId: res.razorpay_order_id,
                  }),
                }
              );
            },
          });
          rzp.open();
        }}
      />
    </div>
  );
}
