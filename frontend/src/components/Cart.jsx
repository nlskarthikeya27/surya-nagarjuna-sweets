import { useState } from "react";
import Checkout from "./Checkout";

export default function Cart({ items, onClose, onRemove, onUpdateQty }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (showCheckout) {
    return <Checkout items={items} total={total} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="bg-amber-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">🛒 Your Cart</h2>
          <button onClick={onClose} className="text-2xl hover:text-amber-200">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-amber-600 mt-16 text-lg">
              Your cart is empty 😕<br />
              <span className="text-sm">Add some sweets!</span>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900">{item.name}</h4>
                  <p className="text-amber-600 text-sm">₹{item.price} each</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => onUpdateQty(item._id, item.qty - 1)} className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full font-bold hover:bg-amber-300">-</button>
                    <span className="font-semibold">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item._id, item.qty + 1)} className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full font-bold hover:bg-amber-300">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-800">₹{item.price * item.qty}</p>
                  <button onClick={() => onRemove(item._id)} className="text-red-400 text-xs hover:text-red-600 mt-1">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-amber-200">
            <div className="flex justify-between text-lg font-bold text-amber-900 mb-4">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-amber-800 transition"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}